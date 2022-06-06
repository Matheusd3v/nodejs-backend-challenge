"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
const databaseConfig = {
    development: {
        type: "mysql",
        host: "database",
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: false,
        entities: ["src/entities/**/*.*"],
        migrations: ["src/database/migrations/**/*.*"],
        ssl: false,
    },
    production: {
        type: "mysql",
        host: "database",
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false,
        entities: ["dist/entities/**/*.*"],
        migrations: ["dist/database/migrations/**/*.*"],
        ssl: false,
    },
    test: {
        type: "mysql",
        host: "database",
        port: 5535,
        username: "user_test",
        password: process.env.DB_PASS,
        database: "db_test",
        synchronize: true,
        logging: false,
        entities: ["src/entities/**/*.*"],
        migrations: ["src/database/migrations/**/*.*"],
        ssl: false,
    },
};
exports.AppDataSource = new typeorm_1.DataSource(databaseConfig[process.env.NODE_ENV]);
//# sourceMappingURL=data-source.js.map