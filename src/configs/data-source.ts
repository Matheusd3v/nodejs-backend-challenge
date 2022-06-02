import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    synchronize: false,
    logging: true,
    // entities: ,
});

AppDataSource.initialize()
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Don't connect!!", err));
