import { NextFunction, Request, Response } from "express";

import { CatchError, ConflictError, NotFoundError } from "../errors";
import { UserRepository } from "../repositories";
import { IUser } from "../repositories/user/interfaceUser.repository";

const verifyUserExists =
    (exists = false) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.validated as IUser;
            const { user_id } = req.params;

            const param = user_id ? { id: user_id } : { email };

            const userExists = await new UserRepository().findUser(param);

            if (exists && userExists) {
                throw new ConflictError("This user already exists.");
            }

            if (!exists && !userExists) {
                throw new NotFoundError("User not found.");
            }

            return next();
        } catch (error) {
            return new CatchError().catch(error, res);
        }
    };

export { verifyUserExists };
