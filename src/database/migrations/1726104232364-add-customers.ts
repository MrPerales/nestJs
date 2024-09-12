import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomers1726104232364 implements MigrationInterface {
    name = 'AddCustomers1726104232364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_ac1455877a69957f7466d5dc78\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac1455877a69957f7466d5dc78\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
