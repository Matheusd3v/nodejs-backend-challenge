"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIfTodoExists = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const verifyIfTodoExists = async (req, res, next) => {
    try {
        const { todo_id } = req.params;
        const todoExists = await new repositories_1.TodoRepository().findById(todo_id);
        if (!todoExists) {
            throw new errors_1.NotFoundError("To do not found.");
        }
        req.todo = todoExists;
        return next();
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.verifyIfTodoExists = verifyIfTodoExists;
//# sourceMappingURL=verifyIfTodoExists.middleware.js.map