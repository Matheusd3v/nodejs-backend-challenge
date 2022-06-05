import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";
import { AdminRepository } from "../repositories";

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

    jsonwebtoken.verify(token, jwtConfig.secretKey, async (e, decoded) => {
        if (e) {
            return res.status(401).json({ error: e.message });
        }

        const { userId, isAdmin, id, adminKey } = decoded as JwtPayload;

        if (isAdmin) {
            const user = await new AdminRepository().findAdmin(id);

            const match = await compare(adminKey, user.adminKey);

            if (!match) {
                return res
                    .status(401)
                    .json({ error: "Invalid admin credentials." });
            }
        }

        req.decoded = { userId };

        return next();
    });
};

export { validateAuthToken };
