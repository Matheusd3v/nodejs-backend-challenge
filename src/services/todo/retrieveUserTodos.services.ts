import { TodoRepository } from "../../repositories";

const retrieveUsersTodoService = async (userId: string) => {
    const updateOverdues = await new TodoRepository().updateUserOverdueTodos(
        userId
    );

    const todoList = await new TodoRepository().retrieveUserTodos(userId);

    return todoList;
};

export { retrieveUsersTodoService };
