import { Express, Router } from "express";

const todoRoute = (app: Express) => {
    const route = Router();

    app.use("api/v1", route);
};

export { todoRoute };
