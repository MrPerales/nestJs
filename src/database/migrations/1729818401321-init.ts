import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1729818401321 implements MigrationInterface {
  name = 'Init1729818401321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`image\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`brand_id\` int NULL, UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`quantity\` int NOT NULL, \`product_id\` int NULL, \`order_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_b942d55b92ededa770041db9de\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`mail\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`customer_id\` int NULL, UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_ad02a1be8707004cb805a4b502\` (\`nickname\`), UNIQUE INDEX \`REL_c7bc1ffb56c570f42053fa7503\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_categories\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_8748b4a0e8de6d266f2bbc877f\` (\`product_id\`), INDEX \`IDX_9148da8f26fc248e77a387e311\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_772d0ce0473ac2ccfa26060dbe9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_8748b4a0e8de6d266f2bbc877f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_9148da8f26fc248e77a387e3112\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_9148da8f26fc248e77a387e3112\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_8748b4a0e8de6d266f2bbc877f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_772d0ce0473ac2ccfa26060dbe9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9148da8f26fc248e77a387e311\` ON \`product_categories\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8748b4a0e8de6d266f2bbc877f\` ON \`product_categories\``,
    );
    await queryRunner.query(`DROP TABLE \`product_categories\``);
    await queryRunner.query(
      `DROP INDEX \`REL_c7bc1ffb56c570f42053fa7503\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ad02a1be8707004cb805a4b502\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b942d55b92ededa770041db9de\` ON \`customers\``,
    );
    await queryRunner.query(`DROP TABLE \`customers\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`order_items\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\``,
    );
    await queryRunner.query(`DROP TABLE \`brands\``);
  }
}
