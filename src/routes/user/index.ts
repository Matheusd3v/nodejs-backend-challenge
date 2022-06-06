import { Express, Router } from "express";

import { resgisterUserController } from "../../controllers";
import { verifyUserExists } from "../../middlewares";
import { validateShape } from "../../middlewares/validateShapes.middleware";
import { createUserShape } from "../../shapes";

const userRoutes = (app: Express) => {
    const route = Router();

    route.post(
        "/user",
        validateShape(createUserShape),
        verifyUserExists,
        resgisterUserController
    );

    app.use("/api/v1", route);
};

export { userRoutes };
