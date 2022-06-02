export default {
    roots: ["<rootDir>/src/tests"],
    coverageProvider: "v8",
    preset: "ts-jest",
    transform: { "^.+\\.ts?$": "ts-jest" },
};
