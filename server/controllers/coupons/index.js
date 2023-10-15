import Coupons from '../../models/coupons/coupon.model.js';

import _ from 'lodash';

/**
 * Generate Random Code of 8 digits.
 * 
 * @returns code
 */

const __generateRandomCode = () => {
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const couponCodeLength = 8;
    let code = ''

    for (let idx = 0; idx < couponCodeLength; idx++) {
        const indexNumber = Math.floor(Math.random() * couponCodeLength);
        code += validCharacters[indexNumber];
    }

    return code;
};

/**
 * Generate valid coupon code.
 * 
 * * Generate coupon code and validate if generated code is valid or not.
 * * if generated code is valid the return that code else re generate new code and check again.
 * 
 */
const __generateCode = async () => {
    let couponCode = '';
    let isCodeValid = false;

    while (!isCodeValid) {
        couponCode = __generateRandomCode();
        const validateCode = await Coupons.findOne({ code: couponCode });

        if (_.isEmpty(validateCode)) isCodeValid = true;
    }

    return couponCode;
}

/**
 * Generate discounted coupon code.
 * 
 * * checking if valid coupon code is already there or not.
 * * if valid coupon code is there return that one.
 * * Else generate new coupon code with private function __generateCode.
 * * Save newly generated coupon code.
 * 
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 */
export const generateCouponCode = async ({ ACTIVE_USER }, res, next) => {
    try {
        const existingCoupon = await Coupons.findOne({ generatedBy: ACTIVE_USER?._id, isValid: true });
        if (!_.isEmpty(existingCoupon))
            return res.status(201).send({ message: 'Coupon code generated successfully.', code: existingCoupon });

        const code = await __generateCode();
        const newCouponCode = new Coupons({
            code,
            generatedBy: ACTIVE_USER?._id,
        });

        await newCouponCode.save();
        return res.status(201).send({ message: 'Coupon code generated successfully.', code: newCouponCode });
    } catch (error) {
        next(error)
    }
};