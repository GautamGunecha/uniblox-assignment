import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler.js';

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

// error handler
app.use(errorHandler)

// setting server port to - 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port: ${port}`.warn));
