import { Express, Router } from "express";

import { validateAuthToken } from "../../middlewares";

const todoRoute = (app: Express) => {
    const route = Router();

    route.post("/todo", validateAuthToken);

    app.use("api/v1", route);
};

export { todoRoute };
