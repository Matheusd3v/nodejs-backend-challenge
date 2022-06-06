import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";
import { CatchError, UnauthoziredError } from "../errors";

const validateAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new UnauthoziredError("Missing authorization headers");
        }

        jsonwebtoken.verify(token, jwtConfig.secretKey, (e, decoded) => {
            if (e) {
                throw new UnauthoziredError(e.message);
            }

            const { userId } = decoded as JwtPayload;

            if (!userId) {
                throw new UnauthoziredError("Invalid token.");
            }

            req.decoded = { userId };

            return next();
        });
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { validateAuthToken };
