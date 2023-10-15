import express from 'express'

const app = express();

// Mock routes and functionality needed for testing
app.get('/', (req, res) => {
    res.status(200).send('Mocked response for testing');
});

export default app;
