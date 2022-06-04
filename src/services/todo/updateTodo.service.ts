import { BadRequestError } from "../../errors";
import { TodoRepository } from "../../repositories";
import {
    ITodo,
    ITodoUpdate,
} from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";
import { MyDateLib } from "../../utils/myDateLib.util";

const updateTodoService = async (data: ITodoUpdate, oldTodo: ITodo) => {
    if (!data.description && !data.deadline) {
        throw new BadRequestError("No fields were sent.");
    }

    const newFormatData = data;

    const dateLib = new MyDateLib();

    newFormatData.overdue = await dateLib.todoIsOverdue(
        oldTodo.deadline as Date
    );

    if (data.description) {
        const descriptionFormated = await titleCaseFunction(data.description);
        newFormatData.description = descriptionFormated;
    }

    if (data.deadline) {
        const deadlineInDatetime = await dateLib.convertToDateTime(
            data.deadline as string
        );

        const todoIsOverdue = await dateLib.todoIsOverdue(deadlineInDatetime);

        newFormatData.deadline = deadlineInDatetime;
        newFormatData.overdue = todoIsOverdue;
    }

    const update = await new TodoRepository().updateTodo(
        newFormatData,
        oldTodo.id
    );

    const updated = await new TodoRepository().findById(oldTodo.id);

    return updated;
};

export { updateTodoService };
