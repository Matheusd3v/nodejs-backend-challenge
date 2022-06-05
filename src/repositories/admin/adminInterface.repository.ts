import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { Admin } from "../../entities";
import { IAdmin, IAdminRepo } from "./admin.repository";

class AdminRepository implements IAdminRepo {
    private ormRepository: Repository<Admin>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Admin);
    }

    findAdmin = async (email: string) => {
        const query = await this.ormRepository
            .createQueryBuilder()
            .select("admin")
            .addSelect("admin.password")
            .addSelect("admin.adminKey")
            .from(Admin, "admin")
            .where("admin.email = :email", { email })
            .getOne();

        return query;
    };
}

export { AdminRepository };
