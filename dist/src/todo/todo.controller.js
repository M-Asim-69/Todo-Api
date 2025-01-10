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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todos_dto_1 = require("./dto/todos.dto");
const jwt_auth_guard_1 = require("../users/auth/guard/jwt/jwt-auth.guard");
const dto_1 = require("../common/dto");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    create(req, createTodoDto) {
        try {
            return this.todoService.create(req.user, createTodoDto);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    getTodoListing(req, query) {
        try {
            return this.todoService.getTodoListing(req.user, query);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    updateTodo(id, updateTodoDto) {
        try {
            return this.todoService.updateTodo(+id, updateTodoDto);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    getTodoById(id) {
        try {
            return this.todoService.getTodoById(+id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    deleteTodo(id) {
        try {
            return this.todoService.deleteTodo(+id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)("testing"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, todos_dto_1.CreateTodoDto]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("listing"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CommonDtos.PaginationInput]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getTodoListing", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, todos_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getTodoById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)("todo"),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map