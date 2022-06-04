import { Express, Router } from "express";

import { createTodoController, finishTodoController } from "../../controllers";
import {
    validateAuthToken,
    validateShape,
    verifyIfTodoExists,
} from "../../middlewares";
import { createTodoShape } from "../../shapes";

const todoRoute = (app: Express) => {
    const route = Router();

    route.post(
        "/todo",
        validateAuthToken,
        validateShape(createTodoShape),
        createTodoController
    );

    route.patch("/todo/:todo_id", validateAuthToken, verifyIfTodoExists);

    route.patch(
        "/todo/:todo_id/finish",
        validateAuthToken,
        verifyIfTodoExists,
        finishTodoController
    );

    app.use("/api/v1", route);
};

export { todoRoute };
