import { NextFunction, Request, Response } from "express";

import { CatchError, ConflictError } from "../errors";
import { UserRepository } from "../repositories";
import { IUser } from "../repositories/user/interfaceUser.repository";

const verifyUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.validated as IUser;

        const userExists = await new UserRepository().findUser({ email });

        if (userExists) {
            throw new ConflictError("This user already exists.");
        }

        return next();
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { verifyUserExists };
