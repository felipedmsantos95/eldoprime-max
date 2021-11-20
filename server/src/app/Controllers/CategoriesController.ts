import { Request, Response } from 'express';
import {Category} from '../Entities/Category';
import CategoryRepository from '../Repository/CategoryRepository';
import { getCustomRepository } from 'typeorm';


class CategoriesController {
    async index(request: Request, response: Response) {

        const categoryRepository = getCustomRepository(CategoryRepository);
        const categories = await categoryRepository.find();
        response.json({
            status: 'success',
            data: categories

        })
    }

    async view(request: Request, response: Response) {
        const categoryRepository = getCustomRepository(CategoryRepository);
        const { id } = request.params;
        const category = await categoryRepository.FindById(id);

        response.json({
            status: 'success',
            data: category

        })
    }

    async create(request: Request, response: Response) {
        try {
            const categoryRepository = getCustomRepository(CategoryRepository);

            const { name } = request.body
            const categoryExists = await categoryRepository.CompareSlug(name);
            
            if (typeof categoryExists !== 'undefined') {
                return response.status(409).json({
                    status: "fail",
                    data: {
                        title: "Esta categoria já está cadastrada"
                    }
                })
            }

            
            let category = new Category();
            category.name = name
            category = await categoryRepository.save(category);

            return response.status(201).json({
                status: "success",
                data: {
                    title: "Nova categoria cadastrada com sucesso!",
                    category: category
                }
            });
        } catch(error) {
            return response.status(400).json({
                status: "error",
                data: {
                    error: error.message
                }
            })
        }
    }


    async delete(request: Request, response: Response) {
        const categoryRepository = getCustomRepository(CategoryRepository);
        const { id } = request.params;
        let category = await categoryRepository.FindById(id);

        await categoryRepository.delete(category);
        return response.json({"msg": "Categoria removida com sucesso!"});
    }
}

export default new CategoriesController();