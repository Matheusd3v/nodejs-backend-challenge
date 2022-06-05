import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { retrieveUsersTodoService } from "../../services";

const retrieveUserTodosController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.decoded;

        const todoList = await retrieveUsersTodoService(userId);

        return res.status(200).json(todoList);
    } catch (error) {
        return new CatchError().catch(error, error);
    }
};

export { retrieveUserTodosController };
