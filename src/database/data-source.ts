import { config } from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "database",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "../entities/**/*.*")],
    migrations: [path.join(__dirname, "../database/migrations/**/*.*")],
    ssl: false,
});
