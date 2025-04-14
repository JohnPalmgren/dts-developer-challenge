module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text', 'lcov', 'clover'],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/__tests__/**/*.ts',
        '**/?(*.)+(spec|test).js',
        '**/?(*.)+(spec|test).ts'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    verbose: true
};