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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const base_service_1 = require("../base/base.service");
const users_entity_1 = require("./entities/users.entity");
const bcrypt_1 = require("../services/bcrypt");
const auth_service_1 = require("./auth/auth.service");
const handleResponse_1 = require("../helpers/handleResponse");
const responseMessage_1 = require("../helpers/responseMessage");
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(usersRepository, bcryptService, authService) {
        super();
        this.usersRepository = usersRepository;
        this.bcryptService = bcryptService;
        this.authService = authService;
    }
    async commitTransaction(ts) {
        await ts.commit();
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository
            .getUserByEmailOrUsername(createUserDto.email, createUserDto.username)
            .getOne();
        if (existingUser) {
            throw new common_1.BadRequestException(`Email or username ${responseMessage_1.responseMessage.ALREADY_EXIST}`);
        }
        const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password);
        const payloadForCreate = {
            ...createUserDto,
            password: hashedPassword,
        };
        const user = new users_entity_1.User(payloadForCreate);
        const transactionScope = this.getTransactionScope();
        transactionScope.add(user);
        await this.commitTransaction(transactionScope);
        const { access_token } = await this.authService.getToken(user);
        const { password, ...userRecord } = user;
        return (0, handleResponse_1.handleData)({ user: userRecord, access_token }, responseMessage_1.responseMessage.SUCCESS, common_1.HttpStatus.CREATED);
    }
    async login(user) {
        const { access_token } = await this.authService.getToken(user);
        const response = { user, access_token };
        return (0, handleResponse_1.handleData)(response, responseMessage_1.responseMessage.SIGNED_IN);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        bcrypt_1.BcryptService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map