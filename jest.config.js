// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // usa ts-jest para TS
  testEnvironment: 'jest-environment-jsdom', // simula o navegador
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // setup do Testing Library
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // aliases do tsconfig
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // mocks de CSS
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx)',
    '**/?(*.)+(test|spec).(ts|tsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_app.tsx',
    '!src/**/_document.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
};
