import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN! || 'mongodb+srv://burger_app:n54Qi5McgTSZWpoQ@cluster0.rbp9k.mongodb.net/burgerApp', {} );
        console.log(`DB ${'online'.blue}`)

    } catch (error) {
        console.log(error);
        throw new Error('Error en la DB :(')
    }

}
