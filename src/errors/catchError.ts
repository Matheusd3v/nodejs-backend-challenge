import { Response } from "express";

import { ErrorHandler } from "./errorHandler";

class CatchError {
    /**
     * catch
     */
    public catch(err: unknown, res: Response) {
        if (err instanceof ErrorHandler) {
            const { status, description } = err;

            return res.status(status).json({ error: description });
        }

        return res.status(500).json(err);
    }
}

export { CatchError };
