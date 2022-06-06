"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishTodoService = void 0;
const repositories_1 = require("../../repositories");
const finishTodoService = async (oldTodo) => {
    if (oldTodo.finishedAt) {
        return { message: "To do already done." };
    }
    const updated = await new repositories_1.TodoRepository().updateTodo({ finishedAt: new Date(), overdue: false }, oldTodo.id);
    return { message: "success" };
};
exports.finishTodoService = finishTodoService;
//# sourceMappingURL=finishTodo.service.js.map