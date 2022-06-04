import { UpdateResult } from "typeorm";

interface ITodo {
    id?: string;
    deadline: Date | string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    fineshedAt?: Date;
    done?: boolean;
    overdue?: boolean;
}

interface ITodoUpdate {
    deadline?: Date | string;
    description?: string;
    overdue?: boolean;
}

interface ITodoRepo {
    createTodo: (todo: ITodo) => Promise<ITodo>;
    updateTodo: (data: ITodoUpdate, id: string) => Promise<UpdateResult>;
    finishTodo: (
        done: boolean,
        finishedAt: Date,
        id: string
    ) => Promise<UpdateResult>;
    retrieveUserTodos: (userId) => Promise<ITodo[]>;
    findById: (id: string) => Promise<ITodo>;
}

export { ITodo, ITodoRepo, ITodoUpdate };
