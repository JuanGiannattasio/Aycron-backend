import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import User from "../models/user";
import { generateJWT } from "../helpers/jwt";
import { getMenuFrontend } from '../helpers/menu-frontend';


export const getUsers = async( req: Request, res: Response ) => {

    const desde = Number( req.query.desde ) || 0;

    // Paginacion y total de users
    const [ users, total ] = await Promise.all([
        User
          .find({}, 'name email role google img')
          .skip( desde )
          .limit(5),

        User.countDocuments()
    ])

    try {
        
        return res.json({
            ok: true,
            users,
            total
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const getUserById = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        // Verificar si existe el user
        const user = await User.findById( id );
        if ( !user ) {
            res.status(404).json({
                ok: false,
                msg: `User dont exists with this id: ${id}`
            })
        };

        return res.json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const newUser = async( req: Request, res: Response ) => {

    const { email, password } = req.body;

    try {
        
        const userExists = await User.findOne({ email });
        if ( userExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already register'
            })
        }

        const user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Guardar en DB
        await user.save();

        // Generar token
        const token = await generateJWT( user.id )

        return res.json({
            ok: true,
            user,
            token,
            menu: getMenuFrontend( user!.role )
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const updateUser = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        // Verificar si existe el user
        const userDB = await User.findById( id );
        if ( !userDB ) {
            res.status(404).json({
                ok: false,
                msg: `User doesnt exists with this id: ${id}`
            })
        };

        // Update
        const { google, email, password, ...fields } = req.body;

        if ( userDB?.email !== email  ) {
            const emailExists = await User.findOne({ email });
            if ( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: `User already exists with this email: ${email}`
                })
            }
        }

        // if ( !userDB?.google ) {
        //     fields.email = email;
        // } else if ( userDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuarios de google no pueden cambiar su correo'
        //     })
        // }

        const userUpdated = await User.findByIdAndUpdate( id, fields, { new: true } )

        return res.json({
            ok: true,
            userUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const deleteUser = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const userDB = await User.findById( id );
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Doesnt exists user whit that id'
            })
        }

        await User.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: `User ${userDB.name} deleted`
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}