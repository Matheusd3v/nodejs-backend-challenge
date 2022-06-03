import { Express, Router } from "express";

const userRoutes = (app: Express) => {
    const route = Router();

    app.use("/user", route);
};

export { userRoutes };
