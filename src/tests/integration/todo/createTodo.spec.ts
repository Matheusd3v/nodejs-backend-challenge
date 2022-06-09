import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import supertest from "supertest";

import app from "../../../app";
import { jwtConfig } from "../../../configs";
import { AdminRepository, UserRepository } from "../../../repositories";
import { ConnectionTestJest, generateUser, ITestUser } from "../../index";

describe("integration test to route common user login", () => {
    let user: ITestUser;
    let id: string;
    let token: string;

    beforeAll(async () => {
        await new ConnectionTestJest().create();

        user = await generateUser();
        const hashedPassword = await hash(user.password, 10);

        id = (
            await new UserRepository().createUser({
                email: user.email,
                password: hashedPassword,
            })
        ).id;

        token = sign({ userId: id }, jwtConfig.secretKey, {
            expiresIn: jwtConfig.expiresIn,
        });
    });

    afterAll(async () => {
        await new ConnectionTestJest().close();
    });

    it("Should return a new TODO created and status201.", async () => {
        const newTodo = {
            description: faker.lorem.sentence(3),
            deadline: "05/05/2022 15:50:00",
        };

        const response = await supertest(app)
            .post("/api/v1/todo")
            .send(newTodo)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(201);

        expect(response.body.deadline).toBeTruthy();
        expect(response.body.description).toBeTruthy();
        expect(response.body.finishedAt).toBeFalsy();
        expect(response.body.id).toBeTruthy();
        expect(response.body.createdAt).toBeTruthy();
        expect(response.body.updatedAt).toBeTruthy();
        expect(response.body.overdue).toBeFalsy();
    });
});
