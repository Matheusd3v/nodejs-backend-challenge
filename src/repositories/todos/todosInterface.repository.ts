import { UpdateResult } from "typeorm";

interface ITodo {
    id?: string;
    deadline: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    fineshedAt?: string;
    done?: boolean;
    overdue?: boolean;
}

interface ITodoUpdate {
    deadline?: string;
    description?: string;
    finishedAt?: string;
    overdue?: boolean;
    done?: boolean;
}

interface ITodoRepo {
    createTodo: (todo: ITodo) => Promise<ITodo>;
    updateTodo: (data: ITodoUpdate, id: string) => Promise<UpdateResult>;
    retrieveUserTodos: (userId) => Promise<ITodo[]>;
    findById: (id: string) => Promise<ITodo>;
}

export { ITodo, ITodoRepo, ITodoUpdate };
