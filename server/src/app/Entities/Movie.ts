import {Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, AfterLoad} from "typeorm";
import {Category} from './Category';
import slugifyConfig from "../../config/slugify";
import slugify from "slugify";
import 'dotenv/config'

const port = process.env.API_PORT || 3001;

@Entity('movies')
export default class Movie {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar')
    public name: string;

    @Column('varchar')
    public slug: string;

    @Column('text')
    public synopsis: string;

    @Column('timestamp')
    public year_release: Date;
    
    @Column('float')
    public profit: number;
    
    @Column('varchar')
    public poster: string;

    @ManyToOne(() => Category)
    @JoinColumn({
        name: 'category_id',
        referencedColumnName: 'id'
    })
    public category: Category

    @Column('boolean')
    public is_actived: boolean;


    @CreateDateColumn()
    public created_at: Date;
    
    @UpdateDateColumn()
    public updated_at: Date;

    public full_path: string;

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

    @AfterLoad()
    public setFullPath() {
        this.full_path = `http://localhost:${port}/static/movies/${this.poster}`;
    }

}