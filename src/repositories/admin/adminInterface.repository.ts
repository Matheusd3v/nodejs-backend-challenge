import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { Admin } from "../../entities";
import { IAdmin, IAdminRepo } from "./admin.repository";

class AdminRepository implements IAdminRepo {
    private ormRepository: Repository<Admin>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Admin);
    }

    findAdmin: (id: string) => Promise<IAdmin>;
}

export { AdminRepository };
