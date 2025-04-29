module.exports = {
    setupFiles: ['<rootDir>/jest.setup.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text', 'lcov', 'clover'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', '<rootDir>/src'],
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