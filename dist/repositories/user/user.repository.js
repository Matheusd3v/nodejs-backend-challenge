"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../../database/data-source");
const User_1 = require("../../entities/User");
class UserRepository {
    constructor() {
        this.createUser = async (user) => {
            const query = await this.ormRepository.save(user);
            return query;
        };
        this.updateUser = async (data, id) => {
            const query = await this.ormRepository.update({ id }, data);
            return query;
        };
        this.deleteUSer = async (id) => {
            const query = await this.ormRepository.delete({ id });
            return query;
        };
        this.findUser = async (param, pass = false) => {
            let query;
            if (pass) {
                const key = Object.keys(param)[0];
                query = await this.ormRepository
                    .createQueryBuilder()
                    .select("user")
                    .addSelect("user.password")
                    .from(User_1.User, "user")
                    .where(`user.${key} = :${key}`, param)
                    .getOne();
                return query;
            }
            query = await this.ormRepository.findOne({ where: param });
            return query;
        };
        this.ormRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map