// jest.config.js
export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    clearMocks: true,
  };
  