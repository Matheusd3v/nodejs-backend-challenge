import { Express, Router } from "express";

import { createTodoController } from "../../controllers";
import { validateAuthToken, validateShape } from "../../middlewares";
import { createTodoShape } from "../../shapes";

const todoRoute = (app: Express) => {
    const route = Router();

    route.post(
        "/todo",
        validateAuthToken,
        validateShape(createTodoShape),
        createTodoController
    );

    app.use("/api/v1", route);
};

export { todoRoute };
