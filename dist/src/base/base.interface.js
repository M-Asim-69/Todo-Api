"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookType = exports.objectState = void 0;
var objectState;
(function (objectState) {
    objectState["INSERT"] = "insert";
    objectState["UPDATE"] = "update";
    objectState["DELETE"] = "delete";
    objectState["HARD_DELETE"] = "hard_delete";
    objectState["BULK_INSERT"] = "bulk_insert";
})(objectState || (exports.objectState = objectState = {}));
var HookType;
(function (HookType) {
    HookType["AFTER_COMMIT"] = "AFTER_COMMIT";
})(HookType || (exports.HookType = HookType = {}));
//# sourceMappingURL=base.interface.js.map