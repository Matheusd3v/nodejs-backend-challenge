import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";

const createTodoService = async (data: ITodo) => {
    const sentenceIntitlecase = await titleCaseFunction(data.description);

    const newTodo = { ...data, description: sentenceIntitlecase };

    const todo = await new TodoRepository().createTodo(newTodo);

    return todo;
};

export { createTodoService };
