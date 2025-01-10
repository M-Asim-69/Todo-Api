import { BaseService } from '../base/base.service';
import { TransactionScope } from '../base/transactionScope';
import { User } from '../users/entities/users.entity';
import { Todo } from './entities/todo.entity';
import { TodosRepository } from './todo.repository';
import { CommonDtos } from '../common/dto';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dto';
export declare class TodoService extends BaseService {
    private todosRepository;
    constructor(todosRepository: TodosRepository);
    commitTransaction(ts: TransactionScope): Promise<void>;
    create(user: User, createTodoDto: CreateTodoDto): Promise<import("../helpers/handleResponse").ApiResponse<Todo>>;
    getTodoListing(user: User, query: CommonDtos.PaginationInput): Promise<import("../helpers/handleResponse").ApiResponse<{
        pagination: {
            totalRecords: number;
            page: number;
            limit: number;
            totalPages: number;
            currentRecords: number;
        };
        data: Todo[];
    }>>;
    updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<import("../helpers/handleResponse").ApiResponse<Todo>>;
    getTodoById(id: number): Promise<import("../helpers/handleResponse").ApiResponse<Todo>>;
    deleteTodo(id: number): Promise<import("../helpers/handleResponse").ApiResponse<Todo>>;
}
