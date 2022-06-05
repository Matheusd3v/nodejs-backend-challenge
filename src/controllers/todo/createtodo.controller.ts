import { Request, Response } from "express";

import { ITodoShape } from "../../@types/express";
import { CatchError } from "../../errors";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { createTodoService } from "../../services";

const createTodoController = async (req: Request, res: Response) => {
    try {
        const { validated } = req;
        const { userId } = req.decoded;

        const newTodo = await createTodoService(
            validated as ITodoShape,
            userId
        );

        return res.status(201).json(newTodo);
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { createTodoController };
