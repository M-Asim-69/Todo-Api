import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
export declare class TodosRepository extends Repository<Todo> {
    private dataSource;
    constructor(dataSource: DataSource);
    getTodoListing(page: number, limit: number, userId: number): Promise<[Todo[], number]>;
    getTodoById(id: number): import("typeorm").SelectQueryBuilder<Todo>;
}
