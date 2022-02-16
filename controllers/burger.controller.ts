import { Request, Response } from "express"
import Burger from "../models/burger"



export const getBurgers = async( req: Request, res: Response ) => {

    const desde = Number(req.query.desde) || 0;

    // Paginación y total de users
    const [ burgers, total ] = await Promise.all([
        Burger
            .find({}, 'name price stock description img')
            .skip( desde )
            .limit(5),
        
        Burger.countDocuments()
    ])

    try {
        
        return res.json({
            ok: true,
            burgers,
            total
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}

export const getBurgersWithoutLimit = async( req: Request, res: Response ) => {

    try {
        
        const burgers = await Burger.find()

        return res.json({
            ok: true,
            burgers
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}


export const getBurgerById = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const burger = await Burger.findById(id)
            .populate('user', 'name img');

        if ( !burger ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe burger con ese id'
            })
        }

        return res.json({
            ok: true,
            burger
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}


export const newBurger = async( req: Request, res: Response ) => {

    // @ts-ignore
    const uid = req.uid;
    const { name } = req.body;
    const burger = new Burger({
        user: uid,
        ...req.body
    })

    try {
        
        const burgerExists = await Burger.findOne({ name });
        if ( burgerExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una burger con ese nombre'
            })
        }

        const burgerDB = await burger.save();

        return res.json({
            ok: true,
            burger: burgerDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}


export const updateBurger = async( req: Request, res: Response ) => {

    // @ts-ignore
    const uid = req.uid;
    const { id } = req.params;

    try {
        
        const burgerDB = await Burger.findById( id );
        if ( !burgerDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe burger con ese id'
            })
        }

        const burgerChanges = {
            ...req.body,
            user: uid
        };

        const burgerUpdated = await Burger.findByIdAndUpdate( id, burgerChanges, { new: true } );
        
        return res.json({
            ok: true,
            burgerUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}


export const deleteBurger = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const burgerDB = await Burger.findById( id );
        if ( !burgerDB ) {
            return res.status(404).json({
                ok: false, 
                msg: 'No existe burger por ese id'
            })
        }

        await Burger.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: 'Burger borrada'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        })
    }

}