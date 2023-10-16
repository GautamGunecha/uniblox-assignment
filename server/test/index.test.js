import request from "supertest";
import app from "../index.js";
import cookie from 'cookie';
import mongoose from "mongoose";

let server;
let token = ''

beforeAll(async () => {
    server = await app.listen(3001);

    // login dummy user
    const response = await request(app)
        .post('/api/auth/signin')
        .send({ email: 'amit@gmail.com', password: 'amit2023' });

    const setCookieHeader = response.headers['set-cookie'];
    const parsedCookies = cookie.parse(setCookieHeader.join('; '));
    token = parsedCookies.access_token;
});

afterAll(async () => {
    await request(app).post('/api/auth/signout')
    if (server) await server.close();
    token = ''
});


describe('Testing root api', () => {
    test('Test API endpoint on the test app', async () => {
        const response = await request(app)
            .get('/');

        expect(response.status).toBe(200);
    });
})

describe('Testing Cart Apis', () => {
    describe('Adding item to cart', () => {
        test('Adding item to cart', async () => {
            const dummyData = {
                productId: "652badfaf7caad03f3587e62"
            }
            const response = await request(app)
                .post('/api/cart')
                .set('Cookie', `access_token=${token}`)
                .send(dummyData)
                .expect(201);

            const { body, status } = response

            expect(status).toBe(201)
            expect(body).toEqual({ message: 'Item added to cart' })
        });
    })

    describe('Getting all items in cart for logged in user', () => {
        test('calling get cart items api', async () => {
            const response = await request(app)
                .get('/api/cart')
                .set('Cookie', `access_token=${token}`)
                .expect(200);

            const { body = {}, status = 200 } = response

            expect(status).toBe(200);
            expect(mongoose.Types.ObjectId.isValid(body._id)).toBe(true);
        })
    })
})

describe('Testing Generate Coupon Code Apis', () => {
    test('Generating coupon code', async () => {
        const response = await request(app)
            .post('/api/coupon')
            .set('Cookie', `access_token=${token}`)
            .expect(201);

        const { body = {}, status = 201 } = response
        const { code = {}, message = "" } = body

        expect(status).toBe(201);
        expect(message).toEqual("Coupon code generated successfully.");
        expect(mongoose.Types.ObjectId.isValid(code._id)).toBe(true);
    })
})