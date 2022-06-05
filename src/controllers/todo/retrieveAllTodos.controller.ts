import { Response, Request } from "express";

import { CatchError } from "../../errors";
import { retrieveAllTodosService } from "../../services";

const retrieveAllTodosController = async (req: Request, res: Response) => {
    try {
        const todos = await retrieveAllTodosService();

        return res.status(200).json(todos);
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { retrieveAllTodosController };
