import { Request, Response } from 'express';
import { User } from '../Entities/User';
import UserRepository from '../Repository/UserRepository';
import { getCustomRepository } from 'typeorm';
// import { createTransport } from 'nodemailer';
// import mailConfig from '../../config/mail'


class UserController {
    async index(request: Request, response: Response) {

        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find();
        response.json({
            status: 'success',
            data: users

        })
    }

    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const {
            email,
            name,
            password
        } = request.body;

        
        const userExists = await userRepository.FindByEmail(email);
        if (typeof userExists !== 'undefined') {
            return response.status(409).json({
                status: "fail",
                data: {
                    error: "Este email já está cadastrado em nosso banco de dados"
                }
            })
        }
                
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = password
        user = await userRepository.save(user);

        return response.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    }
}

export default new UserController();