module.exports = {
    testEnviroment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform:{
          '^.+\\.jsx?$': 'babel-jest',
    },
};