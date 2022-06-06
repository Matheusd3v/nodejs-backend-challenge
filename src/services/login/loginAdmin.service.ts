import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../../configs";
import { UnauthoziredError } from "../../errors";
import { AdminRepository } from "../../repositories";

const loginAdminService = async (
    email: string,
    password: string,
    adminKey: string
) => {
    const user = await new AdminRepository().findAdmin(email);

    if (!user) {
        throw new UnauthoziredError("Invalid admin credentials!");
    }

    const match = await bcrypt.compare(password, user.password);
    const matchAdmin = await bcrypt.compare(adminKey, user.adminKey);

    if (!match || !matchAdmin) {
        throw new UnauthoziredError("Invalid admin credentials!");
    }

    const token = jwt.sign(
        { isAdmin: true, adminKey, email },
        jwtConfig.secretKey,
        {
            expiresIn: jwtConfig.expiresIn,
        }
    );

    return token;
};

export { loginAdminService };
