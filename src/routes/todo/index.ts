import { Express, Router } from "express";

import {
    createTodoController,
    finishTodoController,
    updateTodoController,
} from "../../controllers";
import {
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

    route.get("/todo", validateAuthToken);

    app.use("/api/v1", route);
};

export { todoRoute };
