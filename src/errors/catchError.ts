import { Response } from "express";
import { QueryFailedError } from "typeorm";

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

        if (err instanceof QueryFailedError) {
            if (err.driverError.errno === 1062) {
                return res.status(409).json({
                    error: `This unique item is already saved.`,
                });
            }
            return res.status(500).json({ message: "unexpected db error." });
        }

        return res.status(500).json(err);
    }
}

export { CatchError };
