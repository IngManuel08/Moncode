//importamos el modelo de datos
import User from '../models/user.models.js';
import Role from '../models/roles.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
import dotenv from 'dotenv';

//configuramos las variables de entorno
dotenv.config()

//obtenemos el rol del usuario para el registro de usuarios
const roleUser = process.env.SETUP_ROLE_USER;

//funcion para registrar usuarios
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    //console.log(username, email, password);

    try {
        //validamos que el email no esta registrado en la bd
        const userFound = await User.findOne({ email });
        if (userFound) //ya se encuentra el email registrado en la db
            return res.status(400) //retornamos error en el registro   
                .json({ message: ['El email ya esta registrado'] });

        //encriptar la contraseñas
        const passwordHash = await bcryptjs.hash(password, 10);

        //Obtenemos el rol por defecto para usuarios
        //y lo agregamos al usuario para guardarlo en la db con ese rol
        const role = await Role.findOne({ role: roleUser });
        if (!role) //no se encuentra el rol de usuarios inicializado
            return res.status(401) //retornamos error en el registro
                .json({ message: ["El rol para usuarios no esta definido"] })

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role: role._id
        });
        //console.log(newUser);
        const userSaved = await newUser.save();

        //generamos la cookie de inicio de sesion
        const token = await createAccessToken({ id: userSaved._id });

        //verificamos si el token de inicio de sesion lo generamos para el entorno local
        //de desarrolllo, o lo generamos para el servidor en la nube
        if (process.env.ENVIRONMENT == 'local') {
            res.cookie('token', token, {
                sameSite: 'lax', //para indicar que el back y front son locales para desarrollo
            });
        } else { //el back y fron se encuentran en distintos servidores remotoso
            res.cookie('token', token, {
                sameSite: 'none', //para peticiones remotas
                secure: true, //para activar https en deployment
            });
        } //fin de if(proccess.env.ENVIRONMENT)

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: role.role
        });
    } catch (error) {
        console.log(error);
        console.log('Error al registrar');
        return res.status(402) //retornamos error en el registro   
            .json({ message: ['Error al registrar un usuario'] });
    }
    //aqui va la logica para registrar usuarios a la bd
    //logica para generar tojen de inicio de seision
    //logica para gener cookies
};//fin de register

//funcion para iniciar sesion
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //buscamos el email en la bd
        const userFound = await User.findOne({ email });
        //no se encuentra en la bd
        if (!userFound)
            return res.status(403)
                .json({ message: ["Usuario no encontrado"] })
        //comparamos el password que envio el usuario con el de la bd
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) //no coinciden
            return res.status(404)
                .json({ message: ["Password no coincide"] });
        //existe en la bd y su password es correcto
        //generamos el token de inicio de sesion y retornamos sus datos
        const token = await createAccessToken({ id: userFound._id });

        //verficiamos si el token de inicio de sesion lo generamos para el entorno local
        //de desarrollo, o lo generamos para el servidor en la nube 
        if (process.env.ENVIRONMENT == 'local') {
            res.cookie('token', token, {
                sameSite: 'lax', //para indicar que el back y front son locales para desarrollo
            });
        } else { //el back y front se encuentran en distintos servidores remotos
            res.cookie('token', token, {
                sameSite: 'none', //para peticiones remotas
                secure: true, //para activar https en deployment
            });
        } //fin de if (proccess.env.ENVIRONMENT)

        //obtenemos el rol para el usuario que inicio sesion
        //y lo asignamos en el return del usuario
        const role = await Role.findById(userFound.role);
        if (!role) //no se encuentra el rol del usuario 
            return res.status(405) //retornamos error en el login
                .json({ message: ["El rol para el usuario no esta definido"] })

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: role.role
        });
    } catch (error) {
        console.log(error);
        console.log("Error al iniciar sesion");
        return res.status(406) //retornamos error en el registro   
            .json({ message: ['Error al iniciar sesion'] });
    }
};//fin de login

//funcion para cerrar sesion
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}//fin de logout

//funcion para perfil del usuario
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) //no se encontro en la base de datos
        return res.status(407)
            .json({ message: ['Usuario no encontrado'] });

    //obtenemos el rol para el usuario que inicio sesion 
    //y lo asignamos en el return del usuario
    const role = await Role.findById(userFound.role);
    if (!role) //no se encuentra el rol del usuario
        return res.status(408) //retornamos error en el login
            .json({ message: ("El rol para el usuario no esta definido") })

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: role.role
    });
}//fin de profile

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: ["No autorizado"] });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: ["No autorizado"] });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: ["No autorizado"] });

        const roleObj = await Role.findById(userFound.role);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: roleObj?.role || 'user'
        });
    });
};
