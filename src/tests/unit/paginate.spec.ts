import { faker } from "@faker-js/faker";
import { Response, Request, NextFunction } from "express";

import { paginateMiddleware } from "../../middlewares";

describe("Unit test to paginate middleware", () => {
    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {};
    const mockNext: Partial<NextFunction> = jest.fn();

    beforeEach(() => {
        mockRes.json = jest.fn().mockReturnValue(mockRes);
        mockRes.status = jest.fn().mockReturnValue(mockRes);
    });

    it("Should return a error message and status 400, when is send by quey params a invalid page number", async () => {
        mockReq.query = { page: `-${faker.random.numeric()}` };

        await paginateMiddleware(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "The page must be 1 or greater than 1.",
        });
    });

    it("Should return a error message and status 400, when is send by quey params a invalid per_page number", async () => {
        mockReq.query = {
            page: faker.random.numeric(),
            per_page: `-${faker.random.numeric()}`,
        };

        await paginateMiddleware(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "The per_page number must be 1 or greater than 1.",
        });
    });

    it("Should call next function and add paginated property to MockReq object", async () => {
        const paginated = {
            page: faker.random.numeric(),
            per_page: faker.random.numeric(),
        };

        mockReq.query = paginated;

        await paginateMiddleware(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        expect(mockReq).toHaveProperty("paginated");
        expect(mockReq.paginated).toEqual({
            page: +paginated.page,
            per_page: +paginated.per_page,
        });
    });
});
