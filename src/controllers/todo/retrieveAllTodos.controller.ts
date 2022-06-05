import { Response, Request } from "express";

import { CatchError } from "../../errors";
import { retrieveAllTodosService } from "../../services";

const retrieveAllTodosController = async (req: Request, res: Response) => {
    try {
        const { paginated } = req;
        const { overdue } = req.query;

        const todos = await retrieveAllTodosService(
            paginated,
            overdue as string
        );

        return res.status(200).json(todos);
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { retrieveAllTodosController };
