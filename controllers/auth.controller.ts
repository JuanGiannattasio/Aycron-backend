import { Request, Response } from "express"
import bcrypt from 'bcryptjs';

import User from "../models/user";

import { generateJWT } from "../helpers/jwt";
import { getMenuFrontend } from "../helpers/menu-frontend";
import { googleVerify } from '../helpers/google-verify';





export const login = async( req: Request, res: Response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user or password are wrong'
            })
        };

        // Verificar password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user or password are wrong'
            })
        }

        // Generar token
        const token = await generateJWT( userDB.id );

        return res.json({
            ok: true,
            token,
            menu: getMenuFrontend( userDB!.role ),
            uid: userDB.id
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const googleLogin = async( req: Request, res: Response ) => {

    const googleToken = req.body.token;

    try {
        
        const { name, email, picture } = await googleVerify( googleToken );

        // Verificar si existe usuario con ese email
        const userDB = await User.findOne({ email });
        let user;
        if ( !userDB ) {
            // Si no existe el user se crea uno nuevo con estas caracteristicas
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            // Si existe el user
            user = userDB;
            // @ts-ignore
            user.google = true;
        }

        // Guadrar en DB
        await user.save();

        // JWT
        const token = await generateJWT( user.id );

        return res.json({
            ok: true,
            token,
            menu: getMenuFrontend( user.role )
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Incorrect token'
        })
    }

}


export const renewToken = async( req: Request, res: Response ) => {

    // @ts-ignore
    const uid = req.uid;

    try {
        
        const userDB = await User.findById( uid );

        // Generar jwt
        const token = await generateJWT( uid );

        return res.json({
            ok: true,
            token,
            userDB,
            menu: getMenuFrontend( userDB!.role )
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}