import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFields1725499964925 implements MigrationInterface {
    name = 'AddFields1725499964925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
    }

}
