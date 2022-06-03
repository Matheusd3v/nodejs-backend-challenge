import { Express, Router } from "express";

import { validateShape, verifyUserExists } from "../../middlewares";

const loginRoute = (app: Express) => {
    const route = Router();

    route.post("/login", validateShape(), verifyUserExists());

    app.use("/api/v1", route);
};

export { loginRoute };
