"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const shapes_1 = require("../../shapes");
const loginRoute = (app) => {
    const route = (0, express_1.Router)();
    route.post("/login", (0, middlewares_1.validateShape)(shapes_1.userLoginShape), controllers_1.loginUserController);
    route.post("/login/admin", (0, middlewares_1.validateShape)(shapes_1.adminLoginShape), controllers_1.loginAdminController);
    app.use("/api/v1", route);
};
exports.loginRoute = loginRoute;
//# sourceMappingURL=index.js.map