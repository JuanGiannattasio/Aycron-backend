import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN!, {} );
        console.log(`DB ${'online'.blue}`)

    } catch (error) {
        console.log(error);
        throw new Error('Error en la DB :(')
    }

}
