

import { Request, Response } from "express";

import Warehouse from "../models/warehouse";

export const getWarehouses = async( req: Request, res: Response ) => {

    const desde = Number( req.query.desde ) || 0;

    // Paginacion y total de users
    const [ warehouses, total ] = await Promise.all([
        Warehouse
          .find({}, 'code name address state country zip lat long file')
          .skip( desde )
          .limit(5),

          Warehouse.countDocuments()
    ])

    try {
        
        return res.json({
            ok: true,
            warehouses,
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


export const getWarehousesById = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        // Verificar si existe el user
        const warehouse = await Warehouse.findById( id );
        if ( !warehouse ) {
            res.status(404).json({
                ok: false,
                msg: `Warehouse doesnt exists with this id: ${id}`
            })
        };

        return res.json({
            ok: true,
            warehouse
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const newWarehouse = async( req: Request, res: Response ) => {

    const { code } = req.body;

    try {
        
        const warehouseExists = await Warehouse.findOne({ code });
        if ( warehouseExists ) {
            return res.status(400).json({
                ok: false,
                msg: `The code ${code} is alrerady register`
            })
        }

        const warehouse = new Warehouse(req.body);

        // Guardar en DB
        await warehouse.save();

        return res.json({
            ok: true,
            warehouse,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const updateWarehouse = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        // Verificar si existe el user
        const warehouseDB = await Warehouse.findById( id );
        if ( !warehouseDB ) {
            res.status(404).json({
                ok: false,
                msg: `The warehouse doesnt exists with this id: ${id}`
            })
        };

        // Update
        const { google, email, password, ...fields } = req.body;

        // if ( warehouseDB?.email !== email  ) {
        //     const emailExists = await User.findOne({ email });
        //     if ( emailExists ) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: `Ya existe un usuario con el email ${email}`
        //         })
        //     }
        // }

        // if ( !userDB?.google ) {
        //     fields.email = email;
        // } else if ( userDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuarios de google no pueden cambiar su correo'
        //     })
        // }

        // const userUpdated = await User.findByIdAndUpdate( id, fields, { new: true } )

        // return res.json({
        //     ok: true,
        //     userUpdated
        // })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}


export const deleteWarehouse = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const userDB = await Warehouse.findById( id );
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: `Doesnt exists warehouse with this id: ${id}`
            })
        }

        await Warehouse.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: `Warehouse ${userDB.name} deleted`
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        })
    }

}