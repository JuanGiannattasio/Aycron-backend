import { Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { updatePhoto } from '../helpers/update-photo';



export const fileUpload = ( req: Request, res: Response ) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validar tipos
    const validTypes = [ 'users','burgers' ];
    if ( !validTypes.includes(type) ) {
        return res.status(400).json({
            ok: false,
            msg: `No es un tipo valido (${validTypes})`
        });
    }

    // Validar que exista un archivo
    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.image;

    // @ts-ignore Cortar nombre
    const cutName = file.name.split('.');
    const archiveExtension = cutName[ cutName.length - 1 ];

    // Validar extension
    const validExtensions = [ 'png','jpg','jpeg','gif' ];
    if ( !validExtensions.includes(archiveExtension) ) {
        return res.status(400).json({
            ok: false,
            msg: `No es una extensión permtida (${validExtensions})`
        });
    }

    // Generar nombre dle archivo
    const archiveName = `${ uuidv4() }.${archiveExtension}`;

    // Crear el path para guadrar la imagen
    const path = `./uploads/${type}/${archiveName}`;

    // @ts-ignore Mover la imagen
    file.mv( path, (err: any) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la iamgen'
            });
        }

        // Actualizar base de datos
        updatePhoto( type, id, archiveName )

        return res.json({
            ok: true,
            msg: 'Archibo subido',
            archiveName
        })
    })
}


export const showImage = ( req: Request, res: Response ) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImage = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    // Imagen por defecto
    if ( fs.existsSync( pathImage ) ) {
        res.sendFile( pathImage )
    } else {
        const pathImage = path.join( __dirname, `../uploads/no-image.jpg` );
        res.sendFile( pathImage )
    }

}
