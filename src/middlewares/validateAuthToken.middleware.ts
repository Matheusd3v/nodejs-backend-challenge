import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";

const validateAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
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

        req.decoded = { userId };

        return next();
    });
};

export { validateAuthToken };
