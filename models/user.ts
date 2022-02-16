import { Schema } from 'mongoose';
import mongoose from 'mongoose';


interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    img?: string;
    google?: string
}


const UserSchema = new Schema<User>({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: true
    },
    img: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },

});

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    user.uid = _id;
    
    return user;
}


const User = mongoose.model<User>('User', UserSchema);
export default User;