import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";

const finishTodoService = async (oldTodo: ITodo) => {
    if (oldTodo.finishedAt) {
        return { message: "To do already done." };
    }

    const updated = await new TodoRepository().updateTodo(
        { finishedAt: new Date(), overdue: false },
        oldTodo.id
    );

    return { message: "success" };
};

export { finishTodoService };
