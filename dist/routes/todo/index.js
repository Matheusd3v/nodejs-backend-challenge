"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const shapes_1 = require("../../shapes");
const todoRoute = (app) => {
    const route = (0, express_1.Router)();
    route.post("/todo", middlewares_1.validateAuthToken, (0, middlewares_1.validateShape)(shapes_1.createTodoShape), controllers_1.createTodoController);
    route.patch("/todo/:todo_id", middlewares_1.validateAuthToken, middlewares_1.verifyIfTodoExists, (0, middlewares_1.validateShape)(shapes_1.updateTodoShape), controllers_1.updateTodoController);
    route.patch("/todo/:todo_id/finish", middlewares_1.validateAuthToken, middlewares_1.verifyIfTodoExists, controllers_1.finishTodoController);
    route.get("/todo", middlewares_1.validateAuthToken, controllers_1.retrieveUserTodosController);
    route.get("/todos/admin", middlewares_1.validateAdminToken, middlewares_1.paginateMiddleware, controllers_1.retrieveAllTodosController);
    app.use("/api/v1", route);
};
exports.todoRoute = todoRoute;
//# sourceMappingURL=index.js.map