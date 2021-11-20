import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateFKNewsToCategory1637104016352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'movies',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                name: 'fk_movie_category'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('movies', 'fk_movie_category')
    }

}
