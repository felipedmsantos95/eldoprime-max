import {Category} from "../Entities/Category";
import { EntityRepository, Repository } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import slugify from "slugify";
import slugifyConfig from "../../config/slugify";


@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {

    public FindById(id) {

        return this.findOne({id});

        // const query = this.createQueryBuilder('n');
        // query.where({id})
        // return query.getOne()
    }


    public CompareSlug(name: string) {
        let slug = slugify(name, slugifyConfig)
        return this.findOne({slug});
    }
}

export default CategoryRepository;