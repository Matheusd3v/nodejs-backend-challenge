import { Express } from "express";

import { adminRoutes } from "./admin";
import { loginRoute } from "./login";
import { todoRoute } from "./todo";
import { userRoutes } from "./user";

const routes = (app: Express) => {
    userRoutes(app);
    loginRoute(app);
    todoRoute(app);
    adminRoutes(app);
};

export { routes };
