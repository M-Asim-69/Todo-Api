import { DataSource, Repository } from 'typeorm';
import { User } from './entities/users.entity';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    private getUserByField;
    getUserByEmailOrUsername(email: string, username: string): import("typeorm").SelectQueryBuilder<User>;
    getUserDetailsById(id: number): import("typeorm").SelectQueryBuilder<User>;
    getUserByUsername(username: string): import("typeorm").SelectQueryBuilder<User>;
}
