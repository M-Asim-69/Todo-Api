import { TodoService } from "./todo.service";
import { CreateTodoDto, UpdateTodoDto } from "./dto/todos.dto";
import { CommonDtos } from "src/common/dto";
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(req: any, createTodoDto: CreateTodoDto): Promise<import("../helpers/handleResponse").ApiResponse<import("./entities/todo.entity").Todo>>;
    getTodoListing(req: any, query: CommonDtos.PaginationInput): Promise<import("../helpers/handleResponse").ApiResponse<{
        pagination: {
            totalRecords: number;
            page: number;
            limit: number;
            totalPages: number;
            currentRecords: number;
        };
        data: import("./entities/todo.entity").Todo[];
    }>>;
    updateTodo(id: any, updateTodoDto: UpdateTodoDto): Promise<import("../helpers/handleResponse").ApiResponse<import("./entities/todo.entity").Todo>>;
    getTodoById(id: any): Promise<import("../helpers/handleResponse").ApiResponse<import("./entities/todo.entity").Todo>>;
    deleteTodo(id: any): Promise<import("../helpers/handleResponse").ApiResponse<import("./entities/todo.entity").Todo>>;
}
