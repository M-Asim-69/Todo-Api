"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("./constant");
const passport_1 = require("@nestjs/passport");
const users_entity_1 = require("../entities/users.entity");
const users_service_1 = require("../users.service");
const users_repository_1 = require("../users.repository");
const local_strategy_1 = require("./guard/local/local.strategy");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./guard/jwt/jwt.strategy");
const bcrypt_1 = require("../../services/bcrypt");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '6h' },
            }),
            passport_1.PassportModule,
            users_entity_1.User,
        ],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UserRepository,
            local_strategy_1.LocalStrategy,
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            bcrypt_1.BcryptService,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map