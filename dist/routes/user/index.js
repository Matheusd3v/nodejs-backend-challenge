"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const validateShapes_middleware_1 = require("../../middlewares/validateShapes.middleware");
const shapes_1 = require("../../shapes");
const userRoutes = (app) => {
    const route = (0, express_1.Router)();
    route.post("/user", (0, validateShapes_middleware_1.validateShape)(shapes_1.createUserShape), middlewares_1.verifyUserExists, controllers_1.resgisterUserController);
    app.use("/api/v1", route);
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=index.js.map