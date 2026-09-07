import Role from '../models/roles.models.js';
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../db.js';

export const initializeSetup = async ()=>{
    try {
        //configuramos la lectura de variable de entorno
        dotenv.config();

        //nos conectamos a la base de datos
        connectDB();

        const roleAdmin = process.env.SETUP_ROLE_ADMIN;
        const roleUser = process.env.SETUP_ROLE_USER;

        //buscamos si existen los roles en la base de datos
        const countRoles = await Role.estimatedDocumentCount();

        //si countRoles es cero, significa que no hay roles creados
        if (countRoles == 0){
            //Hay que crear los roles de usuario en la bd
            console.log("Creando roles de usuario");
            await Promise.all([
                new Role( {role: roleUser}).save(),
                new Role( {role: roleAdmin}).save()
            ])
        }; //fin de if(countroles)
        
        //importamos los datos del administrador inicial
        const setupAdminUserName = process.env.SETUP_ADMIN_USERNAME;
        const setupAdminPwd = process.env.SETUP_ADMIN_PWD;
        const setupAdminEmail = process.env.SETUP_ADMIN_EMAIL;

        //Buscamos si existe un usuario en admin
        const userAdmin = await User.findOne({username: setupAdminUserName});
        if (userAdmin == null){//no existe un usuario administrador
            //se crea un usuario admin tomando las variables de ambiente
            console.log('Creando usuario admin');
            const roleAdminDB = await Role.findOne({role: roleAdmin});
            const passwdAdmin = await bcryptjs.hash(setupAdminPwd, 10);
            const newUserAdmin = new User({
                username: setupAdminUserName,
                email: setupAdminEmail,
                password: passwdAdmin,
                role: roleAdminDB._id
        });
        await newUserAdmin.save();
        console.log('Roles y usuario inicializado');
        }; //fin de if(serAdmin==null)  
    } catch (error) {
        console.log(error);
        console.log('Error al inicializar los roles de usuario')
    }
}; //fin de initializeSetup


initializeSetup();
