import User from '../models/user.models.js';
import Role from '../models/roles.models.js';
import dotenv from 'dotenv';

//configuramos las variables de entorno 
dotenv.config()

//obtenemos el rol del usuario para el registro de usuarios
const roleAdmin = process.env.SETUP_ROLE_ADMIN;

export const isAdmin = async (req, res, next)=>{
    try{
        const userFound = await User.findById(req.user.id)

        if(!userFound) //no se enontro el id en la base de datos
         return res.status(400)
                    .json({message: ["No autorizado, usuarios no encontrado"]})

        //obtenemos el rol para el usuario que inicio sesion
        //comprobamos que sea administrador
        const role = await Role.findById(userFound.role);
        if (!role) //no se encuentra el rol del usuario
            return res.status(401) //retornamos error en el login
                        .json({message: ["No autorizado, el rol para el usuario no esta definido"]})

        if (role.role !=roleAdmin){
            return res.status(401) //retornamos error en el login
                        .json({message: ["El usuario no esta autorizado para esta operacion"]})
        }

        next();
    } catch (error) {
        return res.status(401)
                    .json({message: ["No autorizado"]})
    }

}//fin de isAdmin
