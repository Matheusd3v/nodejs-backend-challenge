import { Express, Router } from "express";

import { resgisterUserController } from "../../controllers";
import { validateShape } from "../../middlewares/validateShapes.middleware";
import { createUserShape } from "../../shapes";

const userRoutes = (app: Express) => {
    const route = Router();

    route.post(
        "/user",
        validateShape(createUserShape),
        resgisterUserController
    );

    app.use("/api/v1", route);
};

export { userRoutes };
