import { TodoRepository } from "../../repositories";

const retrieveUsersTodo = async (userId: string) => {
    const todoList = new TodoRepository().retrieveUserTodos(userId);

    return todoList;
};

export { retrieveUsersTodo };
