import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { MyDateLib } from "../../utils/myDateLib.util";

const finishTodoService = async (oldTodo: ITodo) => {
    if (oldTodo.done) {
        return { message: "To do already done." };
    }

    const done = true;
    const finishedAt = await new MyDateLib().currentBrazilianDateString();
    const overdue = false;

    const updated = await new TodoRepository().updateTodo(
        { done, finishedAt, overdue },
        oldTodo.id
    );

    return { message: "success" };
};

export { finishTodoService };
