import { Request, Response } from "express";

import { IUser } from "../../repositories/user/interfaceUser.repository";
import { createUserService } from "../../services";

const resgisterUserController = async (req: Request, res: Response) => {
    try {
        const { validated } = req;

        const user = await createUserService(validated as IUser);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export { resgisterUserController };
