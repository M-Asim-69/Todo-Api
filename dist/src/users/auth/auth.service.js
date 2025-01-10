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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_repository_1 = require("../users.repository");
const bcrypt_1 = require("../../services/bcrypt");
const responseMessage_1 = require("../../helpers/responseMessage");
let AuthService = class AuthService {
    constructor(jwtService, userRepository, bcryptService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async validateUser(username, pass) {
        const user = await this.userRepository
            .getUserByUsername(username)
            .getOne();
        if (!user) {
            throw new common_1.BadRequestException(responseMessage_1.responseMessage.INVALID_USER_CREDENTIALS);
        }
        const doesPasswordCompanre = await this.bcryptService.compareHashPassword(pass, user.password);
        if (!doesPasswordCompanre) {
            throw new common_1.BadRequestException(responseMessage_1.responseMessage.INVALID_USER_CREDENTIALS);
        }
        const { password, ...userDetails } = user;
        return userDetails;
    }
    async getToken(user) {
        try {
            const payload = {
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
                id: user.id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_repository_1.UserRepository,
        bcrypt_1.BcryptService])
], AuthService);
//# sourceMappingURL=auth.service.js.map