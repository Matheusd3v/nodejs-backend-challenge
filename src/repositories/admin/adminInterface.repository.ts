import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { Todo } from "../../entities";
import { IAdminRepo } from "./admin.repository";

class AdminRepository implements IAdminRepo {
    private ormRepository: Repository<Todo>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Todo);
    }

    retrieveAllTodos = async () => {
        const query = await this.ormRepository.find({
            relations: { user: true },
            select: { user: { email: true } },
        });

        return query;
    };

    retrieveLateTodos: () => Promise<Todo[]>;
}

export { AdminRepository };
