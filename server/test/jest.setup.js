import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

beforeAll(async () => {
    await mongod.start();
});

afterAll(async () => {
    await mongod.stop();
});
