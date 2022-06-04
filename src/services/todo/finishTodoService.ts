import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";

const finishTodoService = async (oldTodo: ITodo) => {
    if (oldTodo.done) {
        return { message: "To do already done." };
    }

    const done = true;
    const finishedAt = new Date();

    const updated = await new TodoRepository().updateTodo(
        { done, finishedAt },
        oldTodo.id
    );

    return { message: "success" };
};

export { finishTodoService };
