import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';



export const valdiateJWT = ( req: Request, res: Response, next: NextFunction ) => {

    // Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hya token en la petición'
        });
    }

    try {
        
        // @ts-ignore
        const { uid } = jwt.verify( token, process.env.JWT! || '4est0esda456miclasda564ve545165sec154564re6465165ta' );

        // @ts-ignore
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }

}


export const validateADMIN_ROLE = async( req: Request, res: Response, next: NextFunction ) => {

    // @ts-ignore
    const uid = req.uid;

    try {
        
        const userDB = await User.findById( uid );
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El user no existe'
            })
        }

        if ( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los privilegios necesarios'
            })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Revisar logs...'
        })
    }
}


export const validateADMIN_ROLE_o_MismoUser = async( req: Request, res: Response, next: NextFunction ) => {

    // @ts-ignore
    const uid = req.uid;
    const id = req.params.id;

    try {
        
        const userDB = await User.findById( uid );
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El user no existe'
            })
        }

        if ( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            
            next();
            
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los privilegios necesarios'
            })
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Revisar logs...'
        })
    }

}
