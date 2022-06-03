import { Express, Router } from "express";

import { userRoutes } from "./user";

const routes = (app: Express) => {
    const route = Router();

    userRoutes(app);

    app.use("api/v1", route);
};

export { routes };
