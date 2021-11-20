import {Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import slugify from "slugify";
import slugifyConfig from "../../config/slugify";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar')
    public name: string;

    @Column('varchar')
    public slug: string;

    @CreateDateColumn()
    public created_at?: Date;
    
    @UpdateDateColumn()
    public updated_at?: Date;

    @BeforeInsert()
    public createAt() {
        this.created_at = new Date();
    }

    @BeforeUpdate()
    public updatedAt() {
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    @BeforeInsert()
    public addSlug() {
        this.slug = slugify(this.name, slugifyConfig)
    }

}