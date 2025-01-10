import { EntityBase } from '../../base/entityBase';
import { User } from 'src/users/entities/users.entity';
export declare class Todo extends EntityBase {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    user: User;
}
