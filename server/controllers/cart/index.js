import Carts from "../../models/cart/cart.model.js";
import Users from '../../models/user/user.model.js';
import Products from "../../models/product/product.model.js";

import _ from 'lodash';

/**
 * Adds item to user cart.
 * 
 * * Validating body data.
 * * Finding the product by its unique _id.
 * * Checking if the user already has a cart, if not creating one.
 * * Calculatin the total price amount for this item.
 * * Checking if the product is already in the cart or not.
 * * If the product is already in the cart, updating the quantity and price.
 * * If the product is not in the cart, adding it as a new item.
 * * Updating total cart amount.
 * 
 * @param {ACTIVE_USER, body} param0 
 * @param {*} res 
 * @param {*} next 
 * @returns status 201 and message Product added to cart
 */

export const addToCart = async ({ ACTIVE_USER = {}, body = {} }, res, next) => {
    try {
        if (_.isEmpty(body)) throw new Error('Required product details in order to add to cart.')
        const { productId, quantity = 1 } = body

        if (_.isEmpty(productId)) throw new Error('Requirec product id.');
        const product = await Products.findOne({ _id: productId });
        if (_.isEmpty(product)) throw new Error('Product not found.');

        let cart = await Carts.findOne({ user: ACTIVE_USER?._id });
        if (_.isEmpty(cart)) cart = new Carts({ user: ACTIVE_USER?._id, items: [] })

        const price = _.multiply(product?.price, quantity);
        const existingItem = cart?.items?.findIndex((item) => item?.product?.toString() === productId);

        if (!_.isEqual(existingItem, -1)) {
            cart.items[existingItem].quantity += quantity;
            cart.items[existingItem].price += price;
        } else {
            cart.items.push({ product: product?._id, quantity, price });
        }

        cart.totalAmount += price;
        await cart.save();
        return res.status(201).send({ message: 'Item added to cart' });
    } catch (error) {
        next(error)
    }
};

/**
 * Get Cart Items
 * 
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 * @returns cart details
 */

export const getCartItems = async ({ ACTIVE_USER }, res, next) => {
    try {
        const cart = await Carts.findOne({ user: ACTIVE_USER?._id });

        if (_.isEmpty(cart)) return res.status(200).send(cart);
        return res.status(200).send(cart);
    } catch (error) {
        next(error)
    }
};

/**
 * Remove Item from User Cart.
 * 
 * * Validating product details and cart items details.
 * * Finding the index for item to be removed from cart.
 * * Getting single product price which can be used for amount calculations.
 * * Checking if productToRemove quantity is greater quantity of product present in cart.
 * * else remove that product and calculate price difference.
 * 
 * @param {ACTIVE_USER, query} param0 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const removeFromCart = async ({ ACTIVE_USER = {}, query = {} }, res, next) => {
    try {
        const { productId, quantity } = query
        if (_.isEmpty(productId) || _.isEmpty(quantity)) throw new Error('Required product details to remove them from cart.');

        const userCart = await Carts.findOne({ user: ACTIVE_USER?._id });
        if (_.isEmpty(userCart)) throw new Error('User does not have cart assigned.');

        const product = await Products.findOne({ _id: productId });
        if (_.isEmpty(product)) throw new Error('Product does not exists.');

        const productIndex = _.findIndex(userCart?.items, item => item?.product.toString() === productId);
        if (productIndex === -1)
            throw new Error('Product not found in the cart.');

        const productToRemove = userCart?.items[productIndex];
        const productPrice = product?.price || 0;

        if (quantity && productToRemove.quantity > quantity) {
            productToRemove.quantity -= quantity;
            userCart.totalAmount -= quantity * productPrice;
            productToRemove.price -= quantity * productPrice;
        } else {
            const removedQuantity = productToRemove.quantity;
            userCart.items.splice(productIndex, 1);
            userCart.totalAmount -= removedQuantity * productPrice;
        }

        await userCart.save();
        return res.json({ message: 'Product removed from the cart successfully.' });

    } catch (error) {
        next(error)
    }
};