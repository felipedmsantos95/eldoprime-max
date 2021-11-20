import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createNewsTable1636763556920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies',
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
                    name: "slug",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "synopsis",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "year_release",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "profit",
                    type: "float",
                    isNullable: true
                },
                {
                    name: "poster",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "category_id",
                    type: 'int',
                    length: '11'
                },
                {
                    name: "is_actived",
                    type: "boolean",
                    default: true
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
        await queryRunner.dropTable('movies');
    }

}
