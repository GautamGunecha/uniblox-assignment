import { Schema } from 'mongoose';
import uniblox from '../../config'

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 3
    },
    lastName: {
        type: String,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        unique: true
    },
    mobileNumber: {
        type: Number,
        unique: true,
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        postalCode: {
            type: String
        },
        country: {
            type: String
        },
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const userModel = uniblox.model('Users', userSchema);
export default userModel;
