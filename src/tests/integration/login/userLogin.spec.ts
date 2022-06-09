import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
import supertest from "supertest";

import app from "../../../app";
import { jwtConfig } from "../../../configs";
import { UserRepository } from "../../../repositories";
import { ConnectionTestJest, generateUser } from "../../index";

describe("Integration test to route common user login", () => {
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

    it("Should return error message and status 400, when body have missing fields", async () => {
        const { email } = await generateUser();

        const response = await supertest(app)
            .post("/api/v1/login")
            .send({ email });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(["password is a required field"]);
    });

    it("Should return error message and status 400, when body have invalid fields", async () => {
        const { password } = await generateUser();

        const response = await supertest(app)
            .post("/api/v1/login")
            .send({ email: 51, password });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([
            "email must be a `string` type, but the final value was: `51`.",
        ]);
    });
});
