import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { jwtConfig } from "../configs";
import { CatchError, UnauthoziredError } from "../errors";
import { AdminRepository } from "../repositories";

const validateAdminToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        let tokenDecoded: JwtPayload;

        if (!token) {
            throw new UnauthoziredError("Missing authorization headers");
        }

        jsonwebtoken.verify(token, jwtConfig.secretKey, (e, decoded) => {
            if (e) {
                throw new UnauthoziredError(e.message);
            }

            const { isAdmin } = decoded as JwtPayload;

            if (!isAdmin) {
                throw new UnauthoziredError("Invalid admin credentials.");
            }

            tokenDecoded = decoded as JwtPayload;
        });

        const { email, adminKey } = tokenDecoded;

        const user = await new AdminRepository().findAdmin(email);
        const match = await bcrypt.compare(adminKey, user.adminKey);

        if (!match) {
            throw new UnauthoziredError("Invalid admin credentials.");
        }

        return next();
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { validateAdminToken };
