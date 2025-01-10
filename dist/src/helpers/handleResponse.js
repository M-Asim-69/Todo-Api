"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedResponse = exports.handleData = void 0;
const responseMessage_1 = require("./responseMessage");
const common_1 = require("@nestjs/common");
const handleData = (data, message = responseMessage_1.responseMessage.SUCCESS, status = common_1.HttpStatus.OK) => {
    return {
        status,
        result: true,
        message,
        data,
    };
};
exports.handleData = handleData;
const paginatedResponse = (totalRecords, query, data) => {
    return {
        totalRecords,
        page: Number(query.page) ?? 1,
        limit: Number(query.limit) ?? 10,
        totalPages: Math.ceil(totalRecords / query.limit || 10),
        currentRecords: data?.length,
    };
};
exports.paginatedResponse = paginatedResponse;
//# sourceMappingURL=handleResponse.js.map