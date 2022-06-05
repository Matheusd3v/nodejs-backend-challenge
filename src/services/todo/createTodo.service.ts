import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";
import { MyDateLib } from "../../utils/myDateLib.util";

const createTodoService = async (
    data: { deadline: string; description: string },
    userId: string
) => {
    const sentenceIntitlecase = await titleCaseFunction(data.description);

    const dateConverted = await new MyDateLib().brazilianUtcToGlobalUtc(
        data.deadline
    );

    const newTodo = {
        deadline: dateConverted,
        description: sentenceIntitlecase,
    };

    const { user, ...todo } = await new TodoRepository().createTodo(
        newTodo,
        userId
    );

    return todo;
};

export { createTodoService };
