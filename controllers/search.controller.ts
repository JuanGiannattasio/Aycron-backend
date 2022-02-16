import { Request, Response } from "express";

import Burger from "../models/burger";
import User from "../models/user";



export const getSearch = async( req: Request, res: Response ) => {

    const { search } = req.params;
    const regexp = new RegExp( search, 'i' );

    try {
        
        const [ users, burgers ] = await Promise.all([
            User.find({ name: regexp }),
            Burger.find({ name: regexp }),
        ]);

        return res.json({
            ok: true,
            users,
            burgers
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar a un admin'
        })
    }

}


export const getDocuments = async( req: Request, res: Response ) => {

    const { tabla } = req.params;
    const { search } = req.params;
    const regexp = new RegExp( search, 'i' );

    try {
        
        let data = [];
    
        switch ( tabla ) {
            case 'users':
                data = await User.find({ name: regexp });    
            break;
    
            case 'burgers':
                data = await Burger.find({ name: regexp })
                    .populate('user', 'name img');
            break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe de ser users/burgers'
                })
        }

        return res.json({
            ok: true,
            resultados: data 
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar a un admin'
        })
    }
    

}