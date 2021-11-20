import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcryptjs'

export class addNewUserToUserTable1637281294914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const passwordHash = await bcrypt.hash('admin', 10);
        const sql = `insert into users (name, email, password) values ('Super Administrator', 'admin@admin.com', '${passwordHash}')`;
        await queryRunner.query(sql);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from users where email = 'admin@admin.com'`)
    }

}
