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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const todo_entity_1 = require("./entities/todo.entity");
const todo_repository_1 = require("./todo.repository");
const handleResponse_1 = require("../helpers/handleResponse");
const responseMessage_1 = require("../helpers/responseMessage");
let TodoService = class TodoService extends base_service_1.BaseService {
    constructor(todosRepository) {
        super();
        this.todosRepository = todosRepository;
    }
    async commitTransaction(ts) {
        await ts.commit();
    }
    async create(user, createTodoDto) {
        const todoRecord = new todo_entity_1.Todo({
            ...createTodoDto,
            user: user,
        });
        const transactionScope = this.getTransactionScope();
        transactionScope.add(todoRecord);
        await this.commitTransaction(transactionScope);
        return (0, handleResponse_1.handleData)(todoRecord, responseMessage_1.responseMessage.SUCCESS, common_1.HttpStatus.CREATED);
    }
    async getTodoListing(user, query) {
        const [data, totalRecords] = await this.todosRepository.getTodoListing(query.page, query.limit, user.id);
        const response = {
            pagination: (0, handleResponse_1.paginatedResponse)(totalRecords, query, data),
            data,
        };
        return (0, handleResponse_1.handleData)(response, responseMessage_1.responseMessage.SUCCESSFULLY_DONE);
    }
    async updateTodo(id, updateTodoDto) {
        const todo = await this.todosRepository.getTodoById(id).getOne();
        if (!todo) {
            throw new common_1.BadRequestException(responseMessage_1.responseMessage.NOT_FOUND);
        }
        Object.assign(todo, updateTodoDto);
        const transactionScope = this.getTransactionScope();
        transactionScope.update(todo);
        await this.commitTransaction(transactionScope);
        return (0, handleResponse_1.handleData)(todo, responseMessage_1.responseMessage.UPDATED);
    }
    async getTodoById(id) {
        const todo = await this.todosRepository.getTodoById(id).getOne();
        if (!todo) {
            throw new common_1.BadRequestException(responseMessage_1.responseMessage.NOT_FOUND);
        }
        return (0, handleResponse_1.handleData)(todo);
    }
    async deleteTodo(id) {
        const todo = await this.todosRepository.getTodoById(id).getOne();
        if (!todo) {
            throw new common_1.BadRequestException(responseMessage_1.responseMessage.NOT_FOUND);
        }
        const transactionScope = this.getTransactionScope();
        transactionScope.hardDelete(todo);
        await this.commitTransaction(transactionScope);
        return (0, handleResponse_1.handleData)(todo, responseMessage_1.responseMessage.DELETED);
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_repository_1.TodosRepository])
], TodoService);
//# sourceMappingURL=todo.service.js.map