import { NextFunction, Request, Response } from 'express';
import * as Yup from "yup"
import { pt } from "yup-locale-pt"

Yup.setLocale(pt);

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const schema = Yup.object().shape({
            name: Yup.string().required("O campo Título precisa ser preenchido.").trim(),
            year_release: Yup.string().required("O campo Data de Lançamento precisa ser preenchido.").trim(),
            synopsis: Yup.string().required("O campo Sinopse precisa ser preenchido.").trim(),
        });

        await schema.validate(request.body, { abortEarly: false })
        return next();
    } catch (error) {
        return response.status(400).json({
            status: "fail",
            data: {
                error: error.inner[0].message
            }
        })
    }
}