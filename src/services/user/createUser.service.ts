import bcrypt from "bcrypt";

import { UserRepository } from "../../repositories";
import { IUser } from "../../repositories/user/interfaceUser.repository";

const createUserService = async (userData: IUser) => {
    const hashedPass = await bcrypt.hash(userData.password, 10);

    const { id, email, ..._ } = await new UserRepository().createUser({
        ...userData,
        password: hashedPass,
    });

    return { id, email };
};

export { createUserService };
