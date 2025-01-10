import { RemoveOptions } from 'typeorm/repository/RemoveOptions';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { EntityBase } from './entityBase';
import { IRawQuery, objectState } from './base.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export interface RegisterHooksProps {
    listener: Function;
    data: {
        [key: string]: any;
    };
}
export declare enum TransactionCollectionEnum {
    RAW_QUERY = 0,
    ENTITY_COLLECTION = 1,
    BULK_ENTITY_COLLECTION = 2
}
export declare class TransactionScopeOptions {
    where?: any;
    values: QueryDeepPartialEntity<EntityBase>;
}
export declare class TransactionScopeObject {
    type: TransactionCollectionEnum;
    object: EntityBase[] | EntityBase | IRawQuery;
    objectState?: objectState;
    options?: TransactionScopeOptions;
}
export declare class TransactionScope {
    private _transaction_objects;
    private _hooks;
    get transaction_objects(): TransactionScopeObject[];
    addRawQuery(query: string, parameters: any[]): void;
    private resetTransactionObjects;
    add(obj: EntityBase): void;
    update(obj: EntityBase): void;
    private registerHook;
    private filterHooks;
    private excludeHooks;
    registerAfterCommit(props: RegisterHooksProps): void;
    resetAfterCommit(): void;
    bulkInsert<T extends EntityBase>(objs: T[]): void;
    delete(obj: EntityBase): void;
    hardDelete(obj: EntityBase): void;
    deleteCollection(collection: EntityBase[]): void;
    hardDeleteCollection(collection: EntityBase[]): void;
    private processAfterCommitHooks;
    private extractCollectionsFromTransactions;
    commit(saveOptions?: SaveOptions, removeOptions?: RemoveOptions, performEntityBulkUpsert?: boolean): Promise<void>;
}
