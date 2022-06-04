import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";

const createTodoService = async (newTodo: ITodo) => {
    const todo = await new TodoRepository().createTodo(newTodo);

    return todo;
};

export { createTodoService };
