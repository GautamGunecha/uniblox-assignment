import Products from '../models/product/product.model.js';
import dummyProducts from '../assets/productsdata.js';
import _ from 'lodash';

const createDummyProductData = async () => {
    try {
        const product = await Products.find({});
        if (_.isEmpty(product)) {
            console.log('seeding dummy product data to database.'.warn);

            await Products.insertMany(dummyProducts);
            
            console.log('Dummy product data created successfully.'.info)
        }
    } catch (error) {
        console.log(error)
    }
};

export default createDummyProductData;