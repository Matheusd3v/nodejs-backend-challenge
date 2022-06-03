import { Repository } from "typeorm";

import { AppDataSource } from "../../database/data-source";
import { Todo } from "../../entities";
import { ITodo, ITodoRepo, ITodoUpdate } from "./todosInterface.repository";

class TodoRepository implements ITodoRepo {
    private ormRepository: Repository<Todo>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Todo);
    }

    createTodo = async (todo: ITodo) => {
        const query = await this.ormRepository.save(todo);
        return query;
    };

    updateTodo = async (data: ITodoUpdate, id: string) => {
        const query = await this.ormRepository.update({ id }, data);
        return query;
    };

    finishTodo = async (done: boolean, finishedAt: Date, id: string) => {
        const data = { done, finishedAt };
        const query = await this.ormRepository.update({ id }, data);

        return query;
    };

    retrieveUserTodos = async (userId: string) => {
        const query = await this.ormRepository.find({
            where: {
                user: { id: userId },
            },
        });

        return query;
    };
}

export { TodoRepository };
