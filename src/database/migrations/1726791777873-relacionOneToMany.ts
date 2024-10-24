import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionOneToMany1726791777873 implements MigrationInterface {
    name = 'RelacionOneToMany1726791777873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`brandId\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\` (\`customerId\`)`);
    }

}
