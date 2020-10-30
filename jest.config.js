module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts)?$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test))\\.[jt]s?$',
  moduleFileExtensions: ['ts', 'js', 'jxs', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  setupFiles: [],
  moduleNameMapper: {}
};