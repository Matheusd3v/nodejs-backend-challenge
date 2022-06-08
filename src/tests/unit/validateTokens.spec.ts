import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { sign } from "jsonwebtoken";

import { jwtConfig } from "../../configs";
import { validateAdminToken, validateAuthToken } from "../../middlewares";
import { AdminRepository } from "../../repositories";
import { generateUser, ConnectionTestJest } from "../index";

describe("Tests to validateToken middlewares", () => {
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

    it("Should return a error message and status 401, when middleware validateAuthToken don't receive token", async () => {
        mockReq.headers = {
            authorization: undefined,
        };

        validateAuthToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "Missing authorization headers",
        });
    });

    it("Should return a error message and status 401, when middleware validateAuthToken received malformad token | jwt", async () => {
        mockReq.headers = {
            authorization: `Bearer ${faker.random.alphaNumeric(20)}`,
        };

        validateAuthToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "jwt malformed",
        });
    });

    it("Should return error message if invalid token has been sent to middleware validateAuthToken. Status 401 | invalid signature", async () => {
        const user = await generateUser();

        const invalidToken = sign(user, faker.datatype.string(10));

        mockReq.headers = {
            authorization: `Bearer ${invalidToken}`,
        };

        validateAuthToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "invalid signature",
        });
    });

    it("Middleware validateAuthToken should be able to call next function and add key decoded on mockReq object", () => {
        const { secretKey, expiresIn } = jwtConfig;
        const userId = faker.random.alphaNumeric(20);
        const validToken = sign({ userId }, secretKey, { expiresIn });

        mockReq.headers = {
            authorization: `Bearer ${validToken}`,
        };

        validateAuthToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        expect(mockReq).toHaveProperty("decoded");
        expect(mockReq.decoded).toEqual(expect.objectContaining({ userId }));
    });

    it("Should return a error message and status 401, when middleware validateAdminToken don't receive token", async () => {
        mockReq.headers = {
            authorization: undefined,
        };

        validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "Missing authorization headers",
        });
    });

    it("Should return a error message and status 401, when middleware validateAdminToken received malformad token | jwt", async () => {
        mockReq.headers = {
            authorization: `Bearer ${faker.random.alphaNumeric(20)}`,
        };

        validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "jwt malformed",
        });
    });

    it("Should return error message if invalid token has been sent to middleware validateAdminToken. Status 401 | invalid signature", async () => {
        const user = await generateUser();

        const invalidToken = sign(user, faker.datatype.string(10));

        mockReq.headers = {
            authorization: `Bearer ${invalidToken}`,
        };

        validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "invalid signature",
        });
    });

    it("Should return error message if invalid key decoded has been sent to middleware validateAdminToken. Status 401", async () => {
        const { secretKey, expiresIn } = jwtConfig;
        const mockField = faker.random.alphaNumeric(20);
        const invalid_token = sign({ mockField }, secretKey, { expiresIn });

        mockReq.headers = {
            authorization: `Bearer ${invalid_token}`,
        };

        validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "Invalid admin credentials.",
        });
    });

    it("Should return error message if invalid adminKey has been sent in key decoded to middleware validateAdminToken. Status 401", async () => {
        const isAdmin = true;
        const { email, password } = await generateUser();
        const adminData = {
            email,
            password,
            adminKey: await hash(faker.random.alphaNumeric(20), 10),
        };
        const createNewAdmin = await new AdminRepository().createAdmin(
            adminData
        );

        const { secretKey, expiresIn } = jwtConfig;
        const invalid_token = sign(
            { email, adminKey: "fgfdhgfdgdgfdf", isAdmin },
            secretKey,
            { expiresIn }
        );

        mockReq.headers = {
            authorization: `Bearer ${invalid_token}`,
        };

        await validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "Invalid admin credentials.",
        });
    });

    it("Middleware validateAdminToken should be able to call next function without errors.", async () => {
        const { email, password } = await generateUser();
        const adminKey = faker.random.alphaNumeric(20);
        const adminData = {
            email,
            password,
            adminKey: await hash(adminKey, 10),
        };
        const createNewAdmin = await new AdminRepository().createAdmin(
            adminData
        );

        const { secretKey, expiresIn } = jwtConfig;
        const invalid_token = sign(
            { email, adminKey, isAdmin: true },
            secretKey,
            { expiresIn }
        );

        mockReq.headers = {
            authorization: `Bearer ${invalid_token}`,
        };

        await validateAdminToken(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);
    });
});
