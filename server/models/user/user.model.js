import { Schema } from 'mongoose';
import uniblox from '../../config/index.js';

const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: 3
    },
    lastName: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
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

const Users = uniblox.model('Users', userSchema);
export default Users;
