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
        try {
            return await this.ormRepository.save(todo);
        } catch (error) {
            throw new Error("Error repository todo");
        }
    };

    updateTodo = async (data: ITodoUpdate, id: string) => {
        try {
            return await this.ormRepository.update({ id }, data);
        } catch (error) {
            throw new Error("Error repository todo");
        }
    };

    finishTodo = async (done: boolean, finishedAt: Date, id: string) => {
        const data = { done, finishedAt };
        try {
            return await this.ormRepository.update({ id }, data);
        } catch (error) {
            throw new Error("Error repository todo");
        }
    };

    retrieveUserTodos = async (userId: string) => {
        try {
            return await this.ormRepository.find({
                where: {
                    user: { id: userId },
                },
            });
        } catch (error) {
            throw new Error("Error repository todo");
        }
    };
}

export { TodoRepository };
