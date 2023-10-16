import request from "supertest";
import server from "../index.js";

let testServer;

beforeAll(async () => {
    testServer = await server.listen(3001);
});

afterAll(async () => {
    if (testServer) {
        await testServer.close();
    }
});

test('Test API endpoint on the test server', async () => {
    const response = await request(server)
        .get('/');

    expect(response.status).toBe(200);
});
