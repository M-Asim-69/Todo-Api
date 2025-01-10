import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Todos1722094779037 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
