import { Express, Router } from "express";

import { validateShape, verifyUserExists } from "../../middlewares";
import { userLoginShape } from "../../shapes/login/userLogin.shape";

const loginRoute = (app: Express) => {
    const route = Router();

    route.post("/login", validateShape(userLoginShape), verifyUserExists());

    app.use("/api/v1", route);
};

export { loginRoute };
