"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUsersTodoService = void 0;
const repositories_1 = require("../../repositories");
const retrieveUsersTodoService = async (userId) => {
    const updateOverdues = await new repositories_1.TodoRepository().updateUserOverdueTodos(userId);
    const todoList = await new repositories_1.TodoRepository().retrieveUserTodos(userId);
    return todoList;
};
exports.retrieveUsersTodoService = retrieveUsersTodoService;
//# sourceMappingURL=retrieveUserTodos.services.js.map