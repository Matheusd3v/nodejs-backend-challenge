import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { finishTodoService } from "../../services";

const finishTodoController = async (req: Request, res: Response) => {
    try {
        const { todo } = req;

        const message = await finishTodoService(todo);

        return res.status(200).json(message);
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { finishTodoController };
