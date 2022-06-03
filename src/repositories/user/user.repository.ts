import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { User } from "../../entities/User";
import { IUser, IUserRepo, IUserUpdate } from "./interfaceUser.repository";

class UserRepository implements IUserRepo {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(User);
    }

    createUser = async (user: IUser) => {
        try {
            return await this.ormRepository.save(user);
        } catch (error) {
            throw new Error("Error repository");
        }
    };

    updateUser = async (data: IUserUpdate, id: string) => {
        try {
            return await this.ormRepository.update({ id }, data);
        } catch (error) {
            throw new Error("Error repository");
        }
    };

    deleteUSer = async (id: string) => {
        try {
            return await this.ormRepository.delete({ id });
        } catch (error) {
            throw new Error("Error repository delete");
        }
    };
}

export { UserRepository };
