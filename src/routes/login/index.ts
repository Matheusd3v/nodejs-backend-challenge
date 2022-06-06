import { Express, Router } from "express";

import { loginAdminController, loginUserController } from "../../controllers";
import { validateShape, verifyUserExists } from "../../middlewares";
import { adminLoginShape, userLoginShape } from "../../shapes";

const loginRoute = (app: Express) => {
    const route = Router();

    route.post(
        "/login",
        validateShape(userLoginShape),
        verifyUserExists(),
        loginUserController
    );

    route.post(
        "/login/admin",
        validateShape(adminLoginShape),
        loginAdminController
    );

    app.use("/api/v1", route);
};

export { loginRoute };
