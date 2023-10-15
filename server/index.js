import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import auth from './routes/auth/index.js';
import cart from './routes/cart/index.js';
import coupons from './routes/coupons/index.js';
import checkout from './routes/checkout/index.js';
import errorHandler from './middlewares/error/index.js';
import createDummyProductData from './utils/seed.js';
import { auth as validateUser, isAdmin } from './middlewares/auth/index.js'

const app = express();

// color logger
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
});

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(limiter);

// seeding data to database
createDummyProductData();

// api's endpoint
app.use('/api/auth', auth);
app.use('/api/cart', validateUser, cart);
app.use('/api/coupon', isAdmin, coupons);
app.use('/api/checkout', validateUser, checkout);

// error handler
app.use((err, req, res, next) => {
    const errorObject = errorHandler({ err, req });
    res.status(errorObject?.statusCode || err.statusCode || 500).json(errorObject || err);
    next();
});


// setting server port to - 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port: ${port}`.warn));
