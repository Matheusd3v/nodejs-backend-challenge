import { faker } from "@faker-js/faker";
import { Response, Request, NextFunction } from "express";

import { ITodoShape } from "../../@types/express";
import { validateShape } from "../../middlewares";
import { IUser } from "../../repositories/user/interfaceUser.repository";
import {
    adminLoginShape,
    createTodoShape,
    createUserShape,
    updateTodoShape,
    userLoginShape,
} from "../../shapes";
import { generateUser } from "../index";

describe("Unit test for validateShapes middleware", () => {
    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {};
    const mockNext: Partial<NextFunction> = jest.fn();

    beforeEach(() => {
        mockRes.json = jest.fn().mockReturnValue(mockRes);
        mockRes.status = jest.fn().mockReturnValue(mockRes);
    });

    it("should return a error message when a invalid type password has been send to create a new user. Status 400", async () => {
        const invalid_user = {
            email: faker.internet.email(),
            password: [],
        };

        mockReq.body = invalid_user;

        await validateShape(createUserShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith([
            "password must be a `string` type, but the final value was: `[]`.",
        ]);
    });

    it("should return a error message when required fields are not sent to create a new user. Status 400", async () => {
        const invalid_user = {
            email: faker.internet.email(),
        };

        mockReq.body = invalid_user;

        await validateShape(createUserShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith(["password is a required field"]);
    });

    it("should call next function and add validated property to middleware createUserShape.", async () => {
        const newUser = await generateUser();

        mockReq.body = newUser;

        await validateShape(createUserShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        const validated = mockReq.validated as IUser;

        expect(mockReq).toHaveProperty("validated");
        expect(validated.email).toBeTruthy();
        expect(validated.password).toBeTruthy();
    });

    it("should return a error message when a invalid deadline format has been send to create a new TODO. Status 400", async () => {
        const invalid_TODO = {
            description: faker.lorem.sentence(3),
            deadline: "05/30/2022 15:50:00",
        };

        mockReq.body = invalid_TODO;

        await validateShape(createTodoShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith([
            "deadline must have format 'dd/mm/yyyy 24:59:59' ",
        ]);
    });

    it("should return a error message when required fields are not sent to create a new TODO. Status 400", async () => {
        const invalid_TODO = {
            deadline: "20/06/2022 15:50:00",
        };

        mockReq.body = invalid_TODO;

        await validateShape(createTodoShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith([
            "description is a required field",
        ]);
    });

    it("should call next function and add validated property to middleware createTodoShape.", async () => {
        const newTodo = {
            description: faker.lorem.sentence(3).toLowerCase(),
            deadline: "05/05/2022 15:50:00",
        };

        mockReq.body = newTodo;

        await validateShape(createTodoShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        const validated = mockReq.validated as ITodoShape;

        expect(mockReq).toHaveProperty("validated");
        expect(validated.description).toBeTruthy();
        expect(validated.deadline).toBeTruthy();
        expect(validated).toEqual(newTodo);
    });

    it("should return a error message when a invalid deadline format has been send to update a TODO. Status 400", async () => {
        const invalid_TODO = {
            description: faker.lorem.sentence(3),
            deadline: "05/30/2022 15:50:00",
        };

        mockReq.body = invalid_TODO;

        await validateShape(updateTodoShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith([
            "deadline must have format 'dd/mm/yyyy 24:59:59' ",
        ]);
    });

    it("should call next function and add validated property to middleware updateTodoShape.", async () => {
        const correctUpdatedTodo = {
            description: faker.lorem.sentence(3).toLowerCase(),
            deadline: "05/05/2022 15:50:00",
        };

        mockReq.body = correctUpdatedTodo;

        await validateShape(updateTodoShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        const validated = mockReq.validated as ITodoShape;

        expect(mockReq).toHaveProperty("validated");
        expect(validated.description).toBeTruthy();
        expect(validated.deadline).toBeTruthy();
        expect(validated).toEqual(correctUpdatedTodo);
    });

    it("should return a error message when required fields are not sent to do common user login. Status 400", async () => {
        const invalid_login = {
            password: faker.random.numeric(10),
        };

        mockReq.body = invalid_login;

        await validateShape(userLoginShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith(["email is a required field"]);
    });

    it("should return a error message when a invalid email has been sended to do common user login. Status 400", async () => {
        const invalid_login = {
            email: [],
            password: faker.random.numeric(10),
        };

        mockReq.body = invalid_login;

        await validateShape(userLoginShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith([
            "email must be a `string` type, but the final value was: `[]`.",
        ]);
    });

    it("should call next function when a correct common user login data has been sended.", async () => {
        const valid_login = await generateUser();

        mockReq.body = valid_login;

        await validateShape(userLoginShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);
    });

    it("should return a error message when a adminKey field are not sent to do admin login. Status 400", async () => {
        const invalid_admin_login = {
            email: faker.internet.email().toLowerCase(),
            password: faker.random.numeric(10),
        };

        mockReq.body = invalid_admin_login;

        await validateShape(adminLoginShape)(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(400);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith(["adminKey is a required field"]);
    });
});
