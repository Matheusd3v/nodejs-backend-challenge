import { AdminRepository } from "../../repositories";

const retrieveAllTodosService = async () => {
    const todos = await new AdminRepository().retrieveAllTodos();

    return todos;
};

export { retrieveAllTodosService };
