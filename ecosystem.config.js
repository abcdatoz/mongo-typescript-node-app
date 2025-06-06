module.exports = {
    apps: [
        {
            name: "my-ts-app-with-mongo",
            script: "./src/server.ts",
            interpreter: "npx",
            interpreter_args: "ts-node --files -r tsconfig-paths/register",
            watch: false,
        },
    ],
};
