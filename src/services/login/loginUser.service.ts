import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../../configs";
import { UnauthoziredError } from "../../errors";
import { UserRepository } from "../../repositories";

const loginUserService = async (email: string, password: string) => {
    const user = await new UserRepository().findUser({ email }, true);

    if (!user) {
        throw new UnauthoziredError("Email and password don't match.");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new UnauthoziredError("Email and password don't match.");
    }

    const token = jwt.sign({ userId: user.id }, jwtConfig.secretKey, {
        expiresIn: jwtConfig.expiresIn,
    });

    return token;
};

export { loginUserService };
