import { UserRepository } from "../../repositories";
import { IUser } from "../../repositories/user/interfaceUser.repository";

const createUserService = async (userData: IUser) => {
    const { id, email, ..._ } = await new UserRepository().createUser(userData);

    return { id, email };
};

export { createUserService };
