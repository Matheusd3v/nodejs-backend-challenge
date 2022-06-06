import { BadRequestError } from "../../errors";
import { TodoRepository } from "../../repositories";
import {
    ITodo,
    ITodoUpdate,
} from "../../repositories/todos/todosInterface.repository";
import { titleCaseFunction } from "../../utils";
import { MyDateLib } from "../../utils/myDateLib.util";

const updateTodoService = async (
    dataToUpdate: {
        description?: string;
        deadline?: string;
        overdue?: boolean;
    },
    oldTodo: ITodo
) => {
    const { deadline, description } = dataToUpdate;
    const dateLib = new MyDateLib();
    const dataFormated: ITodoUpdate = {};

    if (oldTodo.finishedAt) {
        throw new BadRequestError("To do already done.");
    }

    if (!description && !deadline) {
        throw new BadRequestError("No fields were sent.");
    }

    if (description) {
        const descriptionFormated = await titleCaseFunction(description);
        dataFormated.description = descriptionFormated;
    }

    if (deadline) {
        const convertDeadlineToDate = await dateLib.brazilianUtcToGlobalUtc(
            deadline
        );

        dataFormated.deadline = convertDeadlineToDate;

        const updatedIsOverdue = await dateLib.todoIsOverdue(
            dataFormated.deadline
        );

        dataFormated.overdue = updatedIsOverdue;
    } else {
        dataFormated.overdue = await dateLib.todoIsOverdue(oldTodo.deadline);
    }

    const update = await new TodoRepository().updateTodo(
        dataFormated,
        oldTodo.id
    );

    const updated = await new TodoRepository().findById(oldTodo.id);

    return updated;
};

export { updateTodoService };
