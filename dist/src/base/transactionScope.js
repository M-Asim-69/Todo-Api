"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionScope = exports.TransactionScopeObject = exports.TransactionScopeOptions = exports.TransactionCollectionEnum = void 0;
const entityBase_1 = require("./entityBase");
const base_interface_1 = require("./base.interface");
const OrmUtils_1 = require("typeorm/util/OrmUtils");
const data_source_1 = require("../../db-config/data-source");
var TransactionCollectionEnum;
(function (TransactionCollectionEnum) {
    TransactionCollectionEnum[TransactionCollectionEnum["RAW_QUERY"] = 0] = "RAW_QUERY";
    TransactionCollectionEnum[TransactionCollectionEnum["ENTITY_COLLECTION"] = 1] = "ENTITY_COLLECTION";
    TransactionCollectionEnum[TransactionCollectionEnum["BULK_ENTITY_COLLECTION"] = 2] = "BULK_ENTITY_COLLECTION";
})(TransactionCollectionEnum || (exports.TransactionCollectionEnum = TransactionCollectionEnum = {}));
class TransactionScopeOptions {
}
exports.TransactionScopeOptions = TransactionScopeOptions;
class TransactionScopeObject {
}
exports.TransactionScopeObject = TransactionScopeObject;
class TransactionScope {
    constructor() {
        this._transaction_objects = [];
        this._hooks = [];
    }
    get transaction_objects() {
        return this._transaction_objects;
    }
    addRawQuery(query, parameters) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.RAW_QUERY,
            object: { query: query, parameters: parameters },
        });
    }
    resetTransactionObjects() {
        this._transaction_objects = [];
    }
    add(obj) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.ENTITY_COLLECTION,
            object: obj,
            objectState: base_interface_1.objectState.INSERT,
        });
    }
    update(obj) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.ENTITY_COLLECTION,
            object: obj,
            objectState: base_interface_1.objectState.UPDATE,
        });
    }
    registerHook(props) {
        this._hooks.push(props);
    }
    filterHooks(type) {
        return this._hooks.filter((hook) => hook.type === type);
    }
    excludeHooks(type) {
        return this._hooks.filter((hook) => hook.type !== type);
    }
    registerAfterCommit(props) {
        this.registerHook({
            ...props,
            type: base_interface_1.HookType.AFTER_COMMIT,
        });
    }
    resetAfterCommit() {
        this._hooks = this.excludeHooks(base_interface_1.HookType.AFTER_COMMIT);
    }
    bulkInsert(objs) {
        if (!objs.length)
            return;
        this._transaction_objects.push({
            type: TransactionCollectionEnum.BULK_ENTITY_COLLECTION,
            object: objs,
            objectState: base_interface_1.objectState.BULK_INSERT,
        });
    }
    delete(obj) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.ENTITY_COLLECTION,
            object: obj,
            objectState: base_interface_1.objectState.DELETE,
        });
    }
    hardDelete(obj) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.ENTITY_COLLECTION,
            object: obj,
            objectState: base_interface_1.objectState.HARD_DELETE,
        });
    }
    deleteCollection(collection) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.BULK_ENTITY_COLLECTION,
            object: collection,
            objectState: base_interface_1.objectState.DELETE,
        });
    }
    hardDeleteCollection(collection) {
        this._transaction_objects.push({
            type: TransactionCollectionEnum.BULK_ENTITY_COLLECTION,
            object: collection,
            objectState: base_interface_1.objectState.HARD_DELETE,
        });
    }
    async processAfterCommitHooks() {
        try {
            const afterCommitsHooks = this.filterHooks(base_interface_1.HookType.AFTER_COMMIT);
            const promises = afterCommitsHooks.map((hook) => hook.listener(hook.data));
            await Promise.allSettled(promises);
        }
        catch (error) {
            console.error('error while executing transaction scope AfterCommit Hooks', error);
            throw error;
        }
        finally {
            this.resetAfterCommit();
        }
    }
    extractCollectionsFromTransactions(transaction_objects) {
        const entity_collection = [];
        const raw_query_collection = [];
        transaction_objects.forEach((tr_obj) => {
            if (tr_obj.type === TransactionCollectionEnum.ENTITY_COLLECTION) {
                entity_collection.push(tr_obj);
            }
            else if (tr_obj.type === TransactionCollectionEnum.BULK_ENTITY_COLLECTION) {
                const obj = tr_obj.object;
                entity_collection.push(...obj);
            }
            else {
                raw_query_collection.push(tr_obj);
            }
        });
        return [entity_collection, raw_query_collection];
    }
    async commit(saveOptions, removeOptions, performEntityBulkUpsert = false) {
        try {
            await data_source_1.default.manager.transaction(async (transactionEntityManager) => {
                if (performEntityBulkUpsert) {
                    const [entity_collection, raw_query_collection] = this.extractCollectionsFromTransactions(this.transaction_objects);
                    await transactionEntityManager.save(entity_collection, saveOptions);
                    if (raw_query_collection.length > 0) {
                        for (const rawquery of raw_query_collection) {
                            await transactionEntityManager.query(rawquery.query, rawquery.parameters);
                        }
                    }
                }
                else {
                    for (const transaction of this.transaction_objects) {
                        if (transaction.type === TransactionCollectionEnum.RAW_QUERY) {
                            const rawquery = transaction.object;
                            await transactionEntityManager.query(rawquery.query, rawquery.parameters);
                        }
                        else if (transaction.type ===
                            TransactionCollectionEnum.ENTITY_COLLECTION ||
                            transaction.type ===
                                TransactionCollectionEnum.BULK_ENTITY_COLLECTION) {
                            let entity;
                            switch (transaction.objectState) {
                                case base_interface_1.objectState.DELETE:
                                    entity = transaction.object;
                                    await transactionEntityManager.softRemove(entity, saveOptions);
                                    break;
                                case base_interface_1.objectState.HARD_DELETE:
                                    entity = transaction.object;
                                    await transactionEntityManager.remove(entity, saveOptions);
                                    break;
                                case base_interface_1.objectState.UPDATE:
                                    entity = transaction.object;
                                    if (entity instanceof entityBase_1.EntityBase) {
                                        if (entity.entitySnapshot) {
                                            const entityClass = entity['__proto__']['constructor']['name'];
                                            const propertiesToUpdate = entity.getPropertiesToUpdate();
                                            await transactionEntityManager.update(entityClass, { id: entity.id }, propertiesToUpdate);
                                        }
                                        else if (transaction.options) {
                                            const criteria = transaction.options.where
                                                ? transaction.options.where
                                                : { id: entity.id };
                                            const entityClass = entity['__proto__']['constructor']['name'];
                                            await transactionEntityManager.update(entityClass, criteria, transaction.options.values);
                                        }
                                        else {
                                            await transactionEntityManager.save(entity, saveOptions);
                                        }
                                    }
                                    else if (Array.isArray(entity)) {
                                        for (const en of entity) {
                                            if (en instanceof entityBase_1.EntityBase) {
                                                if (en.entitySnapshot) {
                                                    const entityClass = entity['__proto__']['constructor']['name'];
                                                    const propertiesToUpdate = en.getPropertiesToUpdate();
                                                    await transactionEntityManager.update(entityClass, { id: en.id }, propertiesToUpdate);
                                                }
                                            }
                                            else {
                                                await transactionEntityManager.save(entity, saveOptions);
                                            }
                                        }
                                    }
                                    else {
                                        console.error('ENTITY NOT AN INSTANCE OF ENTITY BASE', entity);
                                        throw new Error('Entity is not an instance of entity base');
                                    }
                                    break;
                                case base_interface_1.objectState.INSERT:
                                    if (transaction.options) {
                                        entity = transaction.object;
                                        const entityClass = entity['__proto__']['constructor']['name'];
                                        const insertResult = (await transactionEntityManager.insert(entityClass, transaction.options.values)).generatedMaps[0];
                                        OrmUtils_1.OrmUtils.mergeDeep(transaction.object, insertResult);
                                    }
                                    else {
                                        entity = transaction.object;
                                        await transactionEntityManager.save(entity, saveOptions);
                                    }
                                    break;
                                case base_interface_1.objectState.BULK_INSERT:
                                    entity = transaction.object[0];
                                    const entityClass = entity['__proto__']['constructor']['name'];
                                    await transactionEntityManager.insert(entityClass, transaction.object);
                                    break;
                            }
                        }
                    }
                }
            });
            this.resetTransactionObjects();
        }
        catch (error) {
            this.resetTransactionObjects();
            throw error;
        }
        await this.processAfterCommitHooks();
    }
}
exports.TransactionScope = TransactionScope;
//# sourceMappingURL=transactionScope.js.map