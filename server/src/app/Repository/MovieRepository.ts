import Movies from "../Entities/Movie";
import { EntityRepository, Repository } from "typeorm";
import slugify from "slugify";
import slugifyConfig from "../../config/slugify";

@EntityRepository(Movies)
class MoviesRepository extends Repository<Movies> {
   
    public FindById(id) {

        return this.findOne({id}, {relations: ['category']});

    }


    public FindByTitle(name: string) {
        return this.findOne({name});
    }

    public CompareSlug(name: string) {
        let slug = slugify(name, slugifyConfig)
        return this.findOne({slug});
    }
}

export default MoviesRepository;
