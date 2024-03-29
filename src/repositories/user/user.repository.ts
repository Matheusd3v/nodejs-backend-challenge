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
        const query = await this.ormRepository.save(user);

        return query;
    };

    updateUser = async (data: IUserUpdate, id: string) => {
        const query = await this.ormRepository.update({ id }, data);

        return query;
    };

    deleteUSer = async (id: string) => {
        const query = await this.ormRepository.delete({ id });

        return query;
    };

    findUser = async (param: { [key: string]: string }, pass = false) => {
        let query: User;

        if (pass) {
            const key = Object.keys(param)[0];

            query = await this.ormRepository
                .createQueryBuilder()
                .select("user")
                .addSelect("user.password")
                .from(User, "user")
                .where(`user.${key} = :${key}`, param)
                .getOne();

            return query;
        }

        query = await this.ormRepository.findOne({ where: param });

        return query;
    };
}

export { UserRepository };
