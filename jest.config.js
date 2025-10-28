module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: ".",
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    }
};
