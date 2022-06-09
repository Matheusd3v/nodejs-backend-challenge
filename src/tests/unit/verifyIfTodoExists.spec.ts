import { Response, Request, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { verifyIfTodoExists } from "../../middlewares";
import { TodoRepository, UserRepository } from "../../repositories";
import { MyDateLib } from "../../utils/myDateLib.util";
import { generateUser, ConnectionTestJest } from "../index";

describe("Unit tests to verifyIfTodoExists middleware", () => {
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

    it("Should return a error message when middleware receive a non-existing id. Status 404", async () => {
        const invalidId = uuid4();

        mockReq.params = { todo_id: invalidId };

        await verifyIfTodoExists(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(404);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({
            error: "To do not found.",
        });
    });

    it("Should call next function and add todo property to MockReq object", async () => {
        const fakeTodo = {
            description: "todo user555",
            deadline: await new MyDateLib().brazilianUtcToGlobalUtc(
                "05/05/2022 15:50:00"
            ),
        };

        const createdUser = await new UserRepository().createUser(
            await generateUser()
        );

        const todoCreated = await new TodoRepository().createTodo(
            fakeTodo,
            createdUser.id
        );

        const todo = await new TodoRepository().findById(todoCreated.id);

        mockReq.params = { todo_id: todoCreated.id };

        await verifyIfTodoExists(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);

        expect(mockReq).toHaveProperty("todo");
        expect(mockReq.todo).toEqual(todo);
    });
});
