import Orders from '../../models/order/order.model.js';
import Products from '../../models/product/product.model.js';
import Coupons from '../../models/coupons/coupon.model.js';
import Carts from '../../models/cart/cart.model.js';

import _ from 'lodash';

const __validateCouponCode = async (couponCode) => {
    const coupon = await Coupons.findOne({ code: couponCode, isValid: true });
    if (_.isEmpty(coupon)) throw new Error('Either coupon code is invalid or has been expired.');

    return coupon
};

/**
 * 
 * * Here I'm assuming that what ever items are present in cart will be proceed to checkout.
 * 
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 */

export const checkout = async ({ ACTIVE_USER, body = {} }, res, next) => {
    try {
        const { couponCode = '', } = body;

        const userCart = await Carts.findOne({ user: ACTIVE_USER?._id });
        if (_.isEmpty(userCart)) throw new Error('Empty Cart. Checkout cannot be initiated.');

        let { items = [], totalAmount = 0 } = userCart;

        let discount = 0;
        let discountPercent = 0;
        let coupon = {};

        if (!_.isEmpty(couponCode)) {
            coupon = await __validateCouponCode(couponCode);

            discountPercent = coupon?.percentageOff;
            discount = discountPercent / 100 * totalAmount;
        }

        const checkoutPrice = totalAmount - discount;

        const newOrder = new Orders({
            user: ACTIVE_USER._id,
            items,
            amount: {
                total: userCart?.totalAmount,
                discountPercent,
                discount,
                paid: checkoutPrice,
            },
            coupon: coupon?._id || null,
        });

        const order = await newOrder.save();
        if (!_.isEmpty(order)) {
            userCart.items = []
            userCart.totalAmount = 0
            await userCart.save();

            if (!_.isEmpty(coupon)) {
                coupon.isValid = false;
                coupon.usedBy = ACTIVE_USER?._id;
                await coupon.save();
            }
        }

        return res.status(201).send({ message: 'Order has been placed successfully.', order });
    } catch (error) {
        next(error)
    }
};
