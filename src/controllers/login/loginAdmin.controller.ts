import { Request, Response } from "express";

import { CatchError } from "../../errors";
import { IAdmin } from "../../repositories/admin/admin.repository";
import { loginAdminService } from "../../services/login/loginAdmin.service";

const loginAdminController = async (req: Request, res: Response) => {
    try {
        const { email, password, adminKey } = req.validated as IAdmin;

        const token = await loginAdminService(email, password, adminKey);

        return res.status(200).json({ message: "success", token });
    } catch (error) {
        return new CatchError().catch(error, res);
    }
};

export { loginAdminController };
