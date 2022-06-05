import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { Todo } from "../../entities";
import { ITodo, ITodoRepo, ITodoUpdate } from "./todosInterface.repository";

class TodoRepository implements ITodoRepo {
    private ormRepository: Repository<Todo>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Todo);
    }

    createTodo = async (todo: ITodo, userId: string) => {
        const query = await this.ormRepository.save({
            ...todo,
            user: { id: userId },
        });
        return query;
    };

    updateTodo = async (data: ITodoUpdate, id: string) => {
        const query = await this.ormRepository.update({ id }, data);
        return query;
    };

    findById = async (id: string) => {
        const query = this.ormRepository.findOne({ where: { id } });

        return query;
    };

    retrieveUserTodos = async (userId: string) => {
        const query = await this.ormRepository.find({
            where: {
                user: { id: userId },
            },
            order: { createdAt: "ASC" },
        });

        return query;
    };

    retrieveAllTodos = async () => {
        const query = await this.ormRepository.find({
            relations: { user: true },
            select: { user: { email: true } },
        });

        return query;
    };
}

export { TodoRepository };
