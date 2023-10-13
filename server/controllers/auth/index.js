// model
import Users from '../../models/user/user.model.js'

// external functions
import _ from 'lodash';
import bcryptjs from 'bcryptjs';

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
        return res.status(200).send({ message: 'Account has been created successfully.' });
    } catch (error) {
        next(error);
    }
}; 