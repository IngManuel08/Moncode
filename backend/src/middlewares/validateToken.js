import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    //obtenemos las cookies
    const { token } = req.cookies;

    if (!token) //si no hay token en las cookies
        return res.status(401)
            .json({ message: ["No token, authorizacion denegada"] });

    //verificamos el token
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) //si hay error al validar el token
            return res.status(403)
                .json({ message: ['Token invalido'] });

        //si no hay error en el token, guardamos el usuario que inicio sesion
        //en el objeto request
        req.user = user;
        next();
    })
}//fin de authRequired
