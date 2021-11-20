import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1637280825622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'NOW()'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
