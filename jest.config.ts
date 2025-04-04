import type, { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: { "^.+\\.tsx?$": "ts-jest" },
    testMatch: ["**/?(*.)+(spec|test).ts"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Alias general para src
        "^@errors/(.*)$": "<rootDir>/src/errors/$1", // Alias para errores
        "^@models/(.*)$": "<rootDir>/src/models/$1", // Alias para modelos
        "^@controllers/(.*)$": "<rootDir>/src/controllers/$1", // Alias para controladores
    },
};

export default config;
