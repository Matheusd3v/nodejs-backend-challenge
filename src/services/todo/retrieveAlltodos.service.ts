import { IPaginated } from "../../@types/express";
import { TodoRepository } from "../../repositories";

const retrieveAllTodosService = async (
    paginated: IPaginated,
    overdue: string
) => {
    if (overdue) {
        const overdueTodos = await new TodoRepository().retrieveAllOverdueTodos(
            paginated
        );

        return overdueTodos;
    }

    const todos = await new TodoRepository().retrieveAllTodos(paginated);

    return todos;
};

export { retrieveAllTodosService };
