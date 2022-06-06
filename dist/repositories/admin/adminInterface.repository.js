"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const data_source_1 = require("../../database/data-source");
const entities_1 = require("../../entities");
class AdminRepository {
    constructor() {
        this.findAdmin = async (email) => {
            const query = await this.ormRepository
                .createQueryBuilder()
                .select("admin")
                .addSelect("admin.password")
                .addSelect("admin.adminKey")
                .from(entities_1.Admin, "admin")
                .where("admin.email = :email", { email })
                .getOne();
            return query;
        };
        this.ormRepository = data_source_1.AppDataSource.getRepository(entities_1.Admin);
    }
}
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=adminInterface.repository.js.map