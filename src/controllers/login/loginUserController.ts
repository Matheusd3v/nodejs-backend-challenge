import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { IUser } from "../../repositories/user/interfaceUser.repository";
import { loginUserService } from "../../services";

const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.validated as IUser;

        const token = await loginUserService(email, password);

        return res.status(200).json({ message: "success", token });
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { loginUserController };
