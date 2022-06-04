import { Express, Router } from "express";

import { loginUserController } from "../../controllers";
import { validateShape, verifyUserExists } from "../../middlewares";
import { userLoginShape } from "../../shapes";

const loginRoute = (app: Express) => {
    const route = Router();

    route.post(
        "/login",
        validateShape(userLoginShape),
        verifyUserExists(),
        loginUserController
    );

    app.use("/api/v1", route);
};

export { loginRoute };
