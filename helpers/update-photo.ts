import fs from 'fs';
import Burger from '../models/burger';
import User from '../models/user';


const deleteImage = ( path: string ) => {

    // Eliminando el path de la imagen anterior
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path )
    }

}


export const updatePhoto = async( type: string, id: string, archiveName: string ) => {

    let oldPath = '';

    switch ( type ) {
        
        case 'users':
            // Verificadno que existe user por ese id
            const userDB = await User.findById( id );    
            if ( !userDB ) {
                console.log('No existe user por ese ID');
                return false
            };
            
            oldPath = `./uploads/users/${ userDB.img }`;
            deleteImage(oldPath);

            // Cambiando el name y guardando en db
            userDB.img = archiveName;
            await userDB.save();
            return true
        break;

        case 'burgers':
            // Verificadno que existe user por ese id
            const burgerDB = await Burger.findById( id );    
            if ( !burgerDB ) {
                console.log('No existe burger por ese ID');
                return false
            };
            
            console.log(burgerDB.img)
            oldPath = `./uploads/burgers/${ burgerDB.img }`;
            deleteImage(oldPath);

            // Cambiando el name y guardando en db
            burgerDB.img = archiveName;
            await burgerDB.save();
            return true
        break;
    
    }

}

