// external functions
import _ from 'lodash';
import jwt from 'jsonwebtoken';

// model
import Users from '../../models/user/user.model.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (_.isEmpty(token)) throw new Error('User is not authorized to access.');

        const salt = process.env.SECRET_KEY || 1234;
        const { payload = {} } = jwt.verify(token, salt, { complete: true });
        const { id } = payload;

        const user = await Users.findOne({ _id: id }).select('-password').lean();
        req.ACTIVE_USER = user;

        next();
    } catch (error) {
        next(error)
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req?.ACTIVE_USER?.isAdmin) next();
            else throw new Error('Admin can only access this api.');
        })
    } catch (error) {
        next(error)
    }
};
