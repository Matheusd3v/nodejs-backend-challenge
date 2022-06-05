import { TodoRepository } from "../../repositories";

const retrieveUsersTodoService = async (userId: string) => {
    const todoList = new TodoRepository().retrieveUserTodos(userId);

    return todoList;
};

export { retrieveUsersTodoService };
