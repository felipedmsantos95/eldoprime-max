import { NextFunction, Request, Response } from 'express';
import * as Yup from "yup"
import { pt } from "yup-locale-pt"

Yup.setLocale(pt);

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const schema = Yup.object().shape({
            name: Yup.string().required("Nome precisa ser preenchido.").trim(),
            email: Yup.string().required("Email precisa ser preenchido.").trim(),
            password: Yup.string().required("Por favor digite a senha.").trim(),
        });

        await schema.validate(request.body, { abortEarly: false })
        return next();
    } catch (error) {
        return response.status(400).json({
            status: "fail",
            message: error.inner
        })
    }
}