import express, { NextFunction, Request, Response } from "express";

import { ErrorHandler, CatchError } from "./errors";
import { routes } from "./routes";

const app = express();

app.use(express.json());

routes(app);

app.use(
    (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
        new CatchError().catch(err, res);
    }
);

export default app;
