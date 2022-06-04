import { UpdateResult } from "typeorm";

interface ITodo {
    id?: string;
    deadline: Date | string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    fineshedAt?: Date;
    done?: boolean;
}

interface ITodoUpdate {
    deadline?: Date;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    finishedAt?: Date;
    done?: boolean;
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
