"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAllTodosService = void 0;
const repositories_1 = require("../../repositories");
const retrieveAllTodosService = async (paginated, overdue) => {
    if (overdue) {
        const overdueTodos = await new repositories_1.TodoRepository().retrieveAllOverdueTodos(paginated);
        return overdueTodos;
    }
    const todos = await new repositories_1.TodoRepository().retrieveAllTodos(paginated);
    return todos;
};
exports.retrieveAllTodosService = retrieveAllTodosService;
//# sourceMappingURL=retrieveAlltodos.service.js.map