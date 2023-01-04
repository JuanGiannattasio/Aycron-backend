import { Schema, model } from 'mongoose';


interface Warehouse {
    code: string;
    name: string;
    address: string;
    state: string;
    country: string;
    zip: number;
    lat: number;
    long: number;
    file: string
}

const WarehouseSchema = new Schema<Warehouse>({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    country: {
        type: String,
    },
    zip: {
        type: Number,
    },
    file: {
        type: String
    }

});

WarehouseSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    user.uid = _id;
    
    return user;
}


const User = model<Warehouse>('Warehouse', WarehouseSchema);
export default User;