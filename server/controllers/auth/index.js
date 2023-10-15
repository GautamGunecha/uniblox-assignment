// model
import Users from '../../models/user/user.model.js'

// external functions
import _ from 'lodash';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { body = {} } = req
        if (_.isEmpty(body)) throw new Error('Required user data not found.');

        const { email = '', password = '' } = body;
        if (_.isEmpty(email) || _.isEmpty(password)) throw new Error('Required user credentials.');

        const user = await Users.findOne({ email }).select('-password -isAdmin').lean();
        if (!_.isEmpty(user)) throw new Error('User account has already been created.');

        const salt = bcryptjs.genSaltSync(13);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const newUser = new Users({
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).send({ message: 'Account has been created successfully.' });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { body = {} } = req;
        if (_.isEmpty(body)) throw new Error('Required user data not found.');

        const { email = '', password = '' } = body;
        if (_.isEmpty(email) || _.isEmpty(password)) throw new Error('Required user credentials.');

        const user = await Users.findOne({ email }).select('-isAdmin').lean();
        if (_.isEmpty(user)) throw new Error('Invalid user credentials.');

        const validPassword = bcryptjs.compareSync(password, user?.password);
        if (!validPassword) throw new Error('Invalid user password.');

        const salt = process.env.SECRET_KEY || 1234;
        const token = jwt.sign({ id: user?._id }, salt);

        return res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .send({
                _id: user?._id,
                email: user?.email,
            });

    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        return res.status(200).send({ message: 'User has signed out.' });
    } catch (error) {
        next(error);
    }
};