import fs from 'fs';
import Warehouse from '../models/warehouse';


const deleteImage = ( path: string ) => {

    // Eliminando el path de la imagen anterior
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path )
    }

}


export const updatePhoto = async( type: string, id: string, archiveName: string ) => {

    let oldPath = '';
    // Verificadno que existe user por ese id
    const warehouseDB = await Warehouse.findById( id );    
    if ( !warehouseDB ) {
        console.log('No existe warehouse por ese ID');
        return false
    };

    oldPath = `./uploads/warehouse/${ warehouseDB.file }`;
    deleteImage(oldPath);

    // Cambiando el name y guardando en db
    warehouseDB.file = archiveName;
    await warehouseDB.save();
    return true;

}

