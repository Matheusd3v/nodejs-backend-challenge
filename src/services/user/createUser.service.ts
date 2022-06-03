import { UserRepository } from "../../repositories";
import { IUser } from "../../repositories/user/interfaceUser.repository";

const createUserService = async (userData: IUser) => {
    const newUser = await new UserRepository().createUser(userData);

    return newUser;
};

export { createUserService };
