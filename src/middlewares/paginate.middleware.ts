import { NextFunction, Request, Response } from "express";

import { BadRequestError, CatchError } from "../errors";

const paginateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let page = 1;
        let per_page = 10;

        if (req.query.page) {
            if (Number(req.query.page) < 1) {
                throw new BadRequestError(
                    "The page must be 1 or greater than 1."
                );
            }

            page = Number(req.query.page);
        }

        if (req.query.per_age) {
            if (Number(req.query.per_age)) {
                throw new BadRequestError(
                    "The per_page number must be 1 or greater than 1."
                );
            }

            per_page = Number(req.query.per_page);
        }

        req.paginated = { page, per_page };

        return next();
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { paginateMiddleware };
