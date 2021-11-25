import { compare } from "bcryptjs";
import { Request, Response } from "express";
import UserRepository from "../Repository/UserRepository";
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth'


class AuthController {
    async auth(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const {
            email,
            password
        } = request.body;

        const user = await userRepository.FindByEmail(email);

        if (typeof user === 'undefined') {
            return response.status(401).json({
                status: "fail",
                data: {
                    error: "Usuário não encontrado."
                }
            })
        }

        const passwordIsValid = await compare(password, user.password);

        if (!passwordIsValid) {
            return response.status(401).json({
                status: "fail",
                data: {
                    error: "Usuário não encontrado."
                }
            })
        }

        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        
        const token = sign({user},
            authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }
        );

        

        return response.json({
            status: 'success',
            data: {
                token
            }
        });

    }
}

export default new AuthController();