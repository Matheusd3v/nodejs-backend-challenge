import { Express, Router } from "express";

const adminRoutes = (app: Express) => {
    const route = Router();

    route.post("/login/admin");

    route.post("/todos/admin");

    app.use("/api/v1", route);
};

export { adminRoutes };
