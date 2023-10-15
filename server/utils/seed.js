import Products from '../models/product/product.model.js';
import dummyProducts from '../assets/productsdata.js';
import dummyUsers from '../assets/userData.js';
import Users from '../models/user/user.model.js';

import _ from 'lodash';
import bcryptjs from 'bcryptjs';

const seedData = async () => {
    try {
        const usersData = [];

        const users = await Users.findOne({});
        if (_.isEmpty(users)) {
            console.log('seeding dummy user data to database.'.warn);

            for (let idx = 0; idx < dummyUsers.length; idx++) {
                const { firstName, lastName, email, password, isAdmin, mobileNumber } = dummyUsers[idx]
                const salt = bcryptjs.genSaltSync(13);
                const hashedPassword = bcryptjs.hashSync(password, salt);
                usersData.push({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    isAdmin,
                    mobileNumber
                })
            };

            await Users.insertMany(usersData);
            
            console.log('Dummy user data created successfully.'.info);
        }

        const product = await Products.findOne({});
        if (_.isEmpty(product)) {
            console.log('seeding dummy product data to database.'.warn);
            await Products.insertMany(dummyProducts);
            console.log('Dummy product data created successfully.'.info);
        }
    } catch (error) {
        console.log(error)
    }
};

export default seedData;