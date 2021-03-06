import { Request, Response } from 'express';
import Movies from '../Entities/Movie';
import MoviesRepository from '../Repository/MovieRepository';
import { getCustomRepository } from 'typeorm';



class MoviesController {
    async index(request: Request, response: Response) {

        const moviesRepository = getCustomRepository(MoviesRepository);
        const movies = await moviesRepository.FindAndPopulate();
        response.json({
            status: 'success',
            data: movies

        })
    }

    async indexByCategory(request: Request, response: Response) {

        const moviesRepository = getCustomRepository(MoviesRepository);
        const { id } = request.params;
        const movies = await moviesRepository.FindByCategory(id);
        response.json({
            status: 'success',
            data: movies

        })
    }

    async view(request: Request, response: Response) {
        const moviesRepository = getCustomRepository(MoviesRepository);
        const { id } = request.params;
        const movies = await moviesRepository.FindById(id);

        response.json({
            status: 'success',
            data: movies

        })
    }

    async create(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRepository);

            const {
                name,
                synopsis,
                year_release,
                profit,
                poster,
                category_id
            } = request.body


            const MoviesAlreadyExists = await moviesRepository.CompareSlug(name);
            
            if (typeof MoviesAlreadyExists !== 'undefined') {
                return response.status(409).json({
                    status: "fail",
                    data: {
                        error: "Um filme com este título já foi cadastrado em nosso banco de dados"
                    }
                })
            }

            
            
            let movies = new Movies();
            movies.name = name
            movies.synopsis = synopsis;
            movies.poster = poster;
            movies.year_release = year_release;
            movies.profit = profit
            movies.category = category_id;
            movies = await moviesRepository.save(movies);

            return response.status(201).json({
                status: "success",
                data: {
                    title: "Filme cadastrado com sucesso!",
                    movies: movies
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

    async update(request: Request, response: Response) {
        const moviesRepository = getCustomRepository(MoviesRepository);
        const { id } = request.params;
        let movies = await moviesRepository.FindById(id);

        const {
            name,
            synopsis,
            year_release,
            profit,
            poster,
            category_id
        } = request.body


        movies.name = name
        movies.synopsis = synopsis;
        movies.poster = poster;
        movies.year_release = year_release;
        movies.profit = profit
        movies.category = category_id;
        movies = await moviesRepository.save(movies);

        return response.json(movies);

    }

    async delete(request: Request, response: Response) {
        const moviesRepository = getCustomRepository(MoviesRepository);
        const { id } = request.params;
        let movie = await moviesRepository.findOne(id);

        if (!movie) {
            return response.status(409).json({
                status: "fail",
                data: {
                    error: "Este filme não foi encontrado em nosso banco de dados"
                }
            })
        }
        await moviesRepository.remove(movie);
        return response.json({"msg": "Filme excluido com suceso!"});
    }
}

export default new MoviesController();