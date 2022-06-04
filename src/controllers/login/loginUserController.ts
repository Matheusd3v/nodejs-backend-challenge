import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { loginUserService } from "../../services";

const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.validated;

        const token = await loginUserService(email, password);

        return res.status(200).json({ message: "success", token });
    } catch (error: unknown) {
        console.log(error);
        return new CatchError().catch(error, res);
    }
};

export { loginUserController };
