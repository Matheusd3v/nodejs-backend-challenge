import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { ITodoUpdate } from "../../repositories/todos/todosInterface.repository";
import { updateTodoService } from "../../services";

const updateTodoController = async (req: Request, res: Response) => {
    try {
        const { todo, validated } = req;

        const todoUpdated = await updateTodoService(
            validated as ITodoUpdate,
            todo
        );

        return res.status(200).json(todoUpdated);
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { updateTodoController };
