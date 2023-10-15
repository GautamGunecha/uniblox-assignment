import Orders from "../../models/order/order.model.js";
import _ from 'lodash'

/**
 * Analytics - Lists count of items purchased, total purchase amount, list of discount codes and total discount amount.
 * 
 * * Pipeline counts following.
 * * Number of items sold for different category.
 * * Calculates total amount of those items sold.
 * * Calculates total discounts applied.
 * * Calculates total amount received.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const analytics = async (req, res, next) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalItemsPurchased: { $sum: { $size: "$items" } },
                    totalAmount: { $sum: "$amount.total" },
                    totalDiscountAmount: { $sum: "$amount.discount" },
                    totalAmountReceived: { $sum: "$amount.paid" },
                    discountCodes: {
                        $addToSet: {
                            $cond: {
                                if: { $ne: ["$coupon", null] },
                                then: "$coupon",
                                else: "$$REMOVE"
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'coupons',
                    localField: 'discountCodes',
                    foreignField: '_id',
                    as: 'discountCodeDetails'
                }
            },
            {
                $unwind: {
                    path: "$discountCodeDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalItemsPurchased: { $first: "$totalItemsPurchased" },
                    totalAmount: { $first: "$totalAmount" },
                    totalDiscountAmount: { $first: "$totalDiscountAmount" },
                    totalAmountReceived: { $first: "$totalAmountReceived" },
                    discountCodes: { $addToSet: "$discountCodeDetails.code" },
                }
            }
        ]

        const summary = await Orders.aggregate(pipeline);
        if (_.isEmpty(summary)) return res.status(200).send({ message: 'No item has been sold yet.' });

        return res.status(200).send({ message: 'Complete data summary', summary })
    } catch (error) {
        next(error)
    }
};  