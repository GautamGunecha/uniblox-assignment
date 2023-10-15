import { Schema } from "mongoose";
import uniblox from "../../config/index.js";

const couponSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    percentageOff: {
        type: Number,
        required: true,
        default: 10,
    },
    expirationDate: {
        type: Date,
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    usedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
});

const Coupons = uniblox.model('coupons', couponSchema);
export default Coupons;
