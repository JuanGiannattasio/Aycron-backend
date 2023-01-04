import { Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { updatePhoto } from '../helpers/update-photo';



export const fileUpload = ( req: Request, res: Response ) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validar tipos
    const validTypes = [ 'warehouse'];
    if ( !validTypes.includes(type) ) {
        return res.status(400).json({
            ok: false,
            msg: `Is not a valid type (${validTypes})`
        });
    }

    // Validar que exista un archivo
    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'No archive'
        });
    }

    // Procesar la imagen...
    const file = req.files.image;

    // @ts-ignore Cortar nombre
    const cutName = file.name.split('.');
    const archiveExtension = cutName[ cutName.length - 1 ];

    // Validar extension
    const validExtensions = [ 'csv','pdf' ];
    if ( !validExtensions.includes(archiveExtension) ) {
        return res.status(400).json({
            ok: false,
            msg: `Is not a valid extension (${validExtensions})`
        });
    }

    // Generar nombre dle archivo
    const archiveName = `${ uuidv4() }.${archiveExtension}`;

    // Crear el path para guadrar la imagen
    const path = `./dist/uploads/warehouse/${archiveName}`;

    // @ts-ignore Mover la imagen
    file.mv( path, (err: any) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error moving the image'
            });
        }

        // Actualizar base de datos
        updatePhoto( type, id, archiveName )

        return res.json({
            ok: true,
            msg: 'File uploaded',
            archiveName
        })
    })
}


export const showImage = ( req: Request, res: Response ) => {

    const photo = req.params.photo;

    const pathImage = path.join( __dirname, `../uploads/warehouse/${ photo }` );

    // Imagen por defecto
    if ( fs.existsSync( pathImage ) ) {
        res.download( pathImage )
    } else {
        const pathImage = path.join( __dirname, `../uploads/no-image.jpg` );
        res.sendFile( pathImage )
    }

}
