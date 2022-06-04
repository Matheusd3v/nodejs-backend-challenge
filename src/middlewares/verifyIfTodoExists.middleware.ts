import { NextFunction, Request, Response } from "express";

import { CatchError, NotFoundError } from "../errors";
import { TodoRepository } from "../repositories";

const verifyIfTodoExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { todo_id } = req.params;

        const todoExists = await new TodoRepository().findById(todo_id);

        if (!todoExists) {
            throw new NotFoundError("This todo not exists.");
        }

        req.todo = todoExists;

        return next();
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { verifyIfTodoExists };
