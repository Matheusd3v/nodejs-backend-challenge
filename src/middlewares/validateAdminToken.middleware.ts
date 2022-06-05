import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";
import { CatchError } from "../errors";
import { AdminRepository } from "../repositories";

const validateAdminToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
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

            const { isAdmin, adminKey, email } = decoded as JwtPayload;

            if (!isAdmin) {
                return res
                    .status(401)
                    .json({ error: "Invalid admin credentials." });
            }

            const user = await new AdminRepository().findAdmin(email);
            const match = await bcrypt.compare(adminKey, user.adminKey);

            if (!match) {
                return res
                    .status(401)
                    .json({ error: "Invalid admin credentials." });
            }

            return next();
        });
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { validateAdminToken };
