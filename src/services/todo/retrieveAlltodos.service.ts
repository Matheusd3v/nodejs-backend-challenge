import { IPaginated } from "../../@types/express";
import { TodoRepository } from "../../repositories";

const retrieveAllTodosService = async (
    paginated: IPaginated,
    overdue: string
) => {
    const todos = await new TodoRepository().retrieveAllTodos(paginated);

    return todos;
};

export { retrieveAllTodosService };
