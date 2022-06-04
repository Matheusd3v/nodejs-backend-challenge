import { TodoRepository } from "../../repositories";
import { ITodo } from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";
import { MyDateLib } from "../../utils/myDateLib.util";

const createTodoService = async (data: ITodo) => {
    const deadline: Date = await new MyDateLib().convertToDateTime(
        data.deadline as string
    );

    const sentenceIntitlecase = await titleCaseFunction(data.description);

    const newTodo = { ...data, deadline, description: sentenceIntitlecase };

    const todo = await new TodoRepository().createTodo(newTodo);

    return todo;
};

export { createTodoService };
