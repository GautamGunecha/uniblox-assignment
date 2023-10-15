export default {
    clearMocks: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'node'],
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    testMatch: ['<rootDir>/server/test/**/*.test.js'],
    setupFilesAfterEnv: ['./server/test/jest.setup.js'],
};
