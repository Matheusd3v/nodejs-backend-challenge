import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";

const finishTodoService = async (oldTodo: ITodo) => {
    const done = true;
    const finishedAt = new Date();

    const updated = await new TodoRepository().updateTodo(
        { done, finishedAt },
        oldTodo.id
    );

    // return { ...oldTodo, done, finishedAt };

    return updated;
};

export { finishTodoService };
