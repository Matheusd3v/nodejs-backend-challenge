import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";
import { CatchError } from "../errors";

const validateAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Missing authorization headers" });
        }

        jsonwebtoken.verify(token, jwtConfig.secretKey, (e, decoded) => {
            if (e) {
                return res.status(401).json({ error: e.message });
            }

            const { userId } = decoded as JwtPayload;

            if (!userId) {
                return res.status(401).json({ error: "Invalid token." });
            }

            req.decoded = { userId };

            return next();
        });
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { validateAuthToken };
