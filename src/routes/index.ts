import { Express } from "express";

import { loginRoute } from "./login";
import { todoRoute } from "./todo";
import { userRoutes } from "./user";

const routes = (app: Express) => {
    userRoutes(app);
    loginRoute(app);
    todoRoute(app);
};

export { routes };
