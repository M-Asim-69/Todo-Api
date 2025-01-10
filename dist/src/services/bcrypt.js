"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcrypt = require("bcryptjs");
class BcryptService {
    async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    async compareHashPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
exports.BcryptService = BcryptService;
//# sourceMappingURL=bcrypt.js.map