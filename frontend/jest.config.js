const nextJest = require('next/jest')

const createJestConfig = nextJest({
   // A Next.js app helye (a jelenlegi mappa)
   dir: './',
})

// Egyedi beállítások
const customJestConfig = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)