import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStandardCategories1637427173503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        

        const adventure = `insert into categories (name, slug) values ('Aventura', 'aventura')`;
        const comedy = `insert into categories (name, slug) values ('Comédia', 'comedia')`;
        const romance = `insert into categories (name, slug) values ('Romance', 'romance')`;
        const horror = `insert into categories (name, slug) values ('Terror', 'terror')`;
        await queryRunner.query(adventure);
        await queryRunner.query(comedy);
        await queryRunner.query(romance);
        await queryRunner.query(horror);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from categories where slug = 'aventura'`)
        await queryRunner.query(`delete from categories where slug = 'comedia'`)
        await queryRunner.query(`delete from categories where slug = 'romance'`)
        await queryRunner.query(`delete from categories where slug = 'terror'`)

    }

}
