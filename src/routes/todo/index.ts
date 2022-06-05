import { Express, Router } from "express";

import {
    createTodoController,
    finishTodoController,
    retrieveAllTodosController,
    retrieveUserTodosController,
    updateTodoController,
} from "../../controllers";
import {
    paginateMiddleware,
    validateAdminToken,
    validateAuthToken,
    validateShape,
    verifyIfTodoExists,
} from "../../middlewares";
import { createTodoShape, updateTodoShape } from "../../shapes";

const todoRoute = (app: Express) => {
    const route = Router();

    route.post(
        "/todo",
        validateAuthToken,
        validateShape(createTodoShape),
        createTodoController
    );

    route.patch(
        "/todo/:todo_id",
        validateAuthToken,
        verifyIfTodoExists,
        validateShape(updateTodoShape),
        updateTodoController
    );

    route.patch(
        "/todo/:todo_id/finish",
        validateAuthToken,
        verifyIfTodoExists,
        finishTodoController
    );

    route.get("/todo", validateAuthToken, retrieveUserTodosController);

    route.get(
        "/todos/admin",
        validateAdminToken,
        paginateMiddleware,
        retrieveAllTodosController
    );

    app.use("/api/v1", route);
};

export { todoRoute };
