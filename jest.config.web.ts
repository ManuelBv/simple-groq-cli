export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/web/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/web/test-setup.ts'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/web/__mocks__/styleMock.ts'
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }
  }
};
