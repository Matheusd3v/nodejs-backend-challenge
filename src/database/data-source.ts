import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

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
};
// console.log(process.env.NODE_ENV, "<=======================");
export const AppDataSource = new DataSource(
    databaseConfig[process.env.NODE_ENV]
);
