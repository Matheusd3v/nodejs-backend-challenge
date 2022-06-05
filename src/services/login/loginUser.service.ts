import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../../configs";
import { BadRequestError } from "../../errors";
import { UserRepository } from "../../repositories";

const loginUserService = async (email: string, password: string) => {
    const user = await new UserRepository().findUser({ email }, true);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new BadRequestError("Email and password don't match.");
    }

    const token = jwt.sign({ userId: user.id }, jwtConfig.secretKey, {
        expiresIn: jwtConfig.expiresIn,
    });

    return token;
};

export { loginUserService };