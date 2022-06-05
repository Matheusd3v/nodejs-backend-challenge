import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";

const createTodoService = async (data: ITodo, userId: string) => {
    const sentenceIntitlecase = await titleCaseFunction(data.description);

    const newTodo = { ...data, description: sentenceIntitlecase };

    const { user, ...todo } = await new TodoRepository().createTodo(
        newTodo,
        userId
    );

    return todo;
};

export { createTodoService };
