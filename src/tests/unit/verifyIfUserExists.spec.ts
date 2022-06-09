import { faker } from "@faker-js/faker";
import { Response, Request, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { verifyUserExists } from "../../middlewares";
import { UserRepository } from "../../repositories";
import { IUser } from "../../repositories/user/interfaceUser.repository";
import { generateUser, ConnectionTestJest } from "../index";

describe("Unit tests to verifyIfUserExists middleware", () => {
    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {};
    const mockNext: Partial<NextFunction> = jest.fn();

    beforeAll(async () => {
        await new ConnectionTestJest().create();
    });

    afterAll(async () => {
        await new ConnectionTestJest().close();
    });

    beforeEach(() => {
        mockRes.json = jest.fn().mockReturnValue(mockRes);
        mockRes.status = jest.fn().mockReturnValue(mockRes);
    });

    it("Should return a error message when middleware receive a existent user email. Status 409", async () => {
        mockReq.validated = await new UserRepository().createUser(
            await generateUser()
        );

        await verifyUserExists(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(409);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "This user already exists.",
        });
    });

    it("Should call next function if recevei a email don't register in database", async () => {
        mockReq.validated = {
            ...(await generateUser()),
            id: faker.random.alphaNumeric(15),
        };

        await verifyUserExists(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);
    });
});
