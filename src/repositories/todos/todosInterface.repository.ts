import { UpdateResult } from "typeorm";

import { IPaginated } from "../../@types/express";

interface ITodo {
    id?: string;
    deadline: Date;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    finishedAt?: Date;
    done?: boolean;
    overdue?: boolean;
}

interface ITodoUpdate {
    deadline?: Date;
    description?: string;
    finishedAt?: Date;
    overdue?: boolean;
    done?: boolean;
}

interface ITodoRepo {
    createTodo: (todo: ITodo, userId: string) => Promise<ITodo>;
    updateTodo: (data: ITodoUpdate, id: string) => Promise<UpdateResult>;
    retrieveUserTodos: (userId) => Promise<ITodo[]>;
    findById: (id: string) => Promise<ITodo>;
    retrieveAllTodos: (paginated: IPaginated) => Promise<ITodo[]>;
    retrieveAllOverdueTodos: (paginated: IPaginated) => Promise<ITodo[]>;
    updateUserOverdueTodos: (userId: string) => Promise<UpdateResult>;
}

export { ITodo, ITodoRepo, ITodoUpdate };
