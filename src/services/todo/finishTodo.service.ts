import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";

const finishTodoService = async (oldTodo: ITodo) => {
    if (oldTodo.done) {
        return { message: "To do already done." };
    }

    const updated = await new TodoRepository().updateTodo(
        { done: true, finishedAt: new Date(), overdue: false },
        oldTodo.id
    );

    return { message: "success" };
};

export { finishTodoService };
