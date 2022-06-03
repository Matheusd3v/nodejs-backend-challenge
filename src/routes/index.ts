import { Express, Router } from "express";

import { userRoutes } from "./user";

const routes = (app: Express) => {
    userRoutes(app);
};

export { routes };
