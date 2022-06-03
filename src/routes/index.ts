import { Express } from "express";

import { loginRoute } from "./login";
import { userRoutes } from "./user";

const routes = (app: Express) => {
    userRoutes(app);
    loginRoute(app);
};

export { routes };
