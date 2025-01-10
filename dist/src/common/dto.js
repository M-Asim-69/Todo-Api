"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonDtos = exports.DEFAULT_PAGE_OFFSET = exports.DEFAULT_PAGE_LIMIT = void 0;
exports.DEFAULT_PAGE_LIMIT = 10;
exports.DEFAULT_PAGE_OFFSET = 1;
var CommonDtos;
(function (CommonDtos) {
    class PaginationInput {
        constructor() {
            this.limit = exports.DEFAULT_PAGE_LIMIT;
            this.page = exports.DEFAULT_PAGE_OFFSET;
        }
    }
    CommonDtos.PaginationInput = PaginationInput;
})(CommonDtos || (exports.CommonDtos = CommonDtos = {}));
//# sourceMappingURL=dto.js.map