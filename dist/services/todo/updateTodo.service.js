"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoService = void 0;
const errors_1 = require("../../errors");
const repositories_1 = require("../../repositories");
const utils_1 = require("../../utils");
const myDateLib_util_1 = require("../../utils/myDateLib.util");
const updateTodoService = async (dataToUpdate, oldTodo) => {
    const { deadline, description } = dataToUpdate;
    const dateLib = new myDateLib_util_1.MyDateLib();
    const dataFormated = {};
    if (oldTodo.finishedAt) {
        throw new errors_1.BadRequestError("To do already done.");
    }
    if (!description && !deadline) {
        throw new errors_1.BadRequestError("No fields were sent.");
    }
    if (description) {
        const descriptionFormated = await (0, utils_1.titleCaseFunction)(description);
        dataFormated.description = descriptionFormated;
    }
    if (deadline) {
        const convertDeadlineToDate = await dateLib.brazilianUtcToGlobalUtc(deadline);
        dataFormated.deadline = convertDeadlineToDate;
        const updatedIsOverdue = await dateLib.todoIsOverdue(dataFormated.deadline);
        dataFormated.overdue = updatedIsOverdue;
    }
    else {
        dataFormated.overdue = await dateLib.todoIsOverdue(oldTodo.deadline);
    }
    const update = await new repositories_1.TodoRepository().updateTodo(dataFormated, oldTodo.id);
    const updated = await new repositories_1.TodoRepository().findById(oldTodo.id);
    return updated;
};
exports.updateTodoService = updateTodoService;
//# sourceMappingURL=updateTodo.service.js.map