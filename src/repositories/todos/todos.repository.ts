import { Repository } from "typeorm";

import { IPaginated } from "../../@types/express";
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

    retrieveAllTodos = async (paginated: IPaginated) => {
        const query = await this.ormRepository.find({
            relations: { user: true },
            select: {
                user: { email: true },
                id: true,
                description: true,
                deadline: true,
            },
            skip: paginated.page,
            take: paginated.per_page,
        });

        return query;
    };

    retrieveAllOverdueTodos = async (paginated: IPaginated) => {
        const query = await this.ormRepository.find({
            relations: { user: true },
            select: {
                user: { email: true },
                id: true,
                description: true,
                deadline: true,
            },
            where: {
                overdue: true,
            },
            skip: paginated.page,
            take: paginated.per_page,
        });

        return query;
    };

    updateUserOverdueTodos = async (id: string) => {
        const query = await this.ormRepository
            .createQueryBuilder()
            .update()
            .set({ overdue: true })
            .where(
                "user.id = :id and overdue = :condition and deadline < :currentDate",
                {
                    id,
                    condition: false,
                    currentDate: new Date(),
                }
            )
            .execute();

        return query;
    };
}

export { TodoRepository };
