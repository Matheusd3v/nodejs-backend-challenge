import { faker } from "@faker-js/faker";

import { AppDataSource } from "../database/data-source";

interface ITestUser {
    email: string;
    password: string;
}

const generateUser = async (): Promise<ITestUser> => {
    const firstName = faker.name.firstName().toLowerCase();
    const email = faker.internet.email(firstName).toLowerCase();
    const password = faker.datatype.number({ min: 1000000 }).toString();

    return {
        email,
        password,
    };
};

class ConnectionTestJest {
    public async create() {
        await AppDataSource.initialize();
    }

    public async close() {
        await AppDataSource.destroy();
    }

    public async clear() {
        await AppDataSource.synchronize(true);
    }
}

export { generateUser, ConnectionTestJest };
