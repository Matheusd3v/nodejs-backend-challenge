import { TodoRepository } from "../../repositories";

const retrieveAllTodosService = async () => {
    const todos = await new TodoRepository().retrieveAllTodos();

    return todos;
};

export { retrieveAllTodosService };
