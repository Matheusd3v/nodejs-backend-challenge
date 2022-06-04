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
        newFormatData.description = await titleCaseFunction(data.description);
    }

    if (data.deadline) {
        newFormatData.deadline = await dateLib.convertToDateTime(
            data.deadline as string
        );

        newFormatData.overdue = await dateLib.todoIsOverdue(
            data.deadline as Date
        );
    }

    const update = await new TodoRepository().updateTodo(
        newFormatData,
        oldTodo.id
    );

    const updated = await new TodoRepository().findById(oldTodo.id);

    return updated;
};

export { updateTodoService };
