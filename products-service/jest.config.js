
const tsconfig = require("./tsconfig.paths.json")
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

module.exports = {
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
  
    testEnvironment: "node",
    testMatch: [
      "**/*.test.ts"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper,
};