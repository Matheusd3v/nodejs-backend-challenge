import { faker } from "@faker-js/faker";

import { AppDataSource } from "../database/data-source";

interface ITestUser {
    email: string;
    password: string;
}

const generateUser = (): ITestUser => {
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
        const entities = AppDataSource.entityMetadatas;

        const entityDeletionPromises = entities.map((entity) => async () => {
            const repository = AppDataSource.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
        await Promise.all(entityDeletionPromises);
    }
}

export { generateUser, ConnectionTestJest };
