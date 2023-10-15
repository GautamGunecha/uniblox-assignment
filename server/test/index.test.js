import request from 'supertest';
import app from '../app.js';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

const mongod = new MongoMemoryReplSet({
    replSet: {
        oplog: true,
    },
});

beforeAll(async () => {
    await mongod.start();
});

afterAll(async () => {
    await mongod.stop();
});

describe('UserController', () => {
    it('should create a new user', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
