import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN! || 'mongodb+srv://mean_user:1Sne3e5mJ63PIHCl@cluster0.xf8k4bo.mongodb.net/aycronTest', {} );
        console.log(`DB ${'online'.blue}`)

    } catch (error) {
        console.log(error);
        throw new Error('Error en la DB :(')
    }

}
