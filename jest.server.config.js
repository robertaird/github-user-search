module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['server/**/*.js'],
  testMatch: ['<rootDir>/server/**/__tests__/**/*.{js,jsx,ts,tsx}'],
};
