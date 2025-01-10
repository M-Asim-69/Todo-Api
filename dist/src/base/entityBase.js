"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityBase = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
class EntityBase {
    loadSnapshotForPartialUpdate() {
        this.entitySnapshot = (0, lodash_1.cloneDeep)(this);
    }
    getPropertiesToUpdate() {
        const snapshot = this.entitySnapshot;
        const propertiesToIgnore = ['createdAt', 'updatedAt'];
        const updatedProperties = {};
        const keys = Object.keys(this).filter((key) => !propertiesToIgnore.includes(key));
        for (const key of keys) {
            if (this[key] instanceof Array && this[key].length) {
                continue;
            }
            if (this[key] instanceof Date &&
                this[key].valueOf() === snapshot[key]?.valueOf()) {
                continue;
            }
            if (this[key] instanceof Array) {
                updatedProperties[key] = this[key];
            }
            else {
                updatedProperties[key] = this[key];
                snapshot[key] = this[key];
            }
        }
        return updatedProperties;
    }
    constructor(entityBase) {
        if (entityBase) {
            Object.assign(this, entityBase);
        }
    }
}
exports.EntityBase = EntityBase;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], EntityBase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], EntityBase.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], EntityBase.prototype, "entitySnapshot", void 0);
//# sourceMappingURL=entityBase.js.map