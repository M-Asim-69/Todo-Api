"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos1722094779037 = void 0;
class Todos1722094779037 {
    constructor() {
        this.name = 'Todos1722094779037';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`todos\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`DROP TABLE \`todos\``);
    }
}
exports.Todos1722094779037 = Todos1722094779037;
//# sourceMappingURL=1722094779037-todos.js.map