import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
import supertest from "supertest";

import app from "../../../app";
import { jwtConfig } from "../../../configs";
import { AdminRepository, UserRepository } from "../../../repositories";
import { ConnectionTestJest, generateUser } from "../../index";

describe("integration test to route common user login", () => {
    beforeAll(async () => {
        await new ConnectionTestJest().create();
    });

    afterAll(async () => {
        await new ConnectionTestJest().close();
    });

    it("should return status 200 and user token as json response", async () => {
        const { email, password } = await generateUser();
        const hashedPassword = await hash(password, 10);

        const { id } = await new UserRepository().createUser({
            email,
            password: hashedPassword,
        });

        const response = await supertest(app)
            .post("/api/v1/login")
            .send({ email, password });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");

        expect(verify(response.body.token, jwtConfig.secretKey)).toBeTruthy();
        expect(verify(response.body.token, jwtConfig.secretKey)).toEqual(
            expect.objectContaining({ userId: id })
        );
    });

    // it("should return status 200 and admin token as json response", async () => {

    // });
});
