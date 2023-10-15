import request from 'supertest';
import server from '../index.js';
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

    server.close((err) => {
        if (err) {
            console.error(`Error closing server: ${err}`);
        }
    });
});


describe('UserController', () => {
    it('should create a new user', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
});
