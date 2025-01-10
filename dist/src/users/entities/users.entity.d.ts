import { EntityBase } from '../../base/entityBase';
import { Todo } from '../../todo/entities/todo.entity';
export declare class User extends EntityBase {
    id: number;
    username: string;
    email: string;
    password?: string;
    todos: Todo[];
}
