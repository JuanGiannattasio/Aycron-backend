import { Schema } from "mongoose";
import mongoose from 'mongoose';



interface Burger {
    name: string;
    price: number;
    stock: number;
    description: string;
    img: string;
    user: any;
}


const BurgerSchema = new Schema<Burger>({

    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        // required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


BurgerSchema.methods.toJSON = function() {
    const { __v, ...burger } = this.toObject();

    return burger
}

const Burger = mongoose.model<Burger>('Burger', BurgerSchema);
export default Burger;