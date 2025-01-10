import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Users1722082722547 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
