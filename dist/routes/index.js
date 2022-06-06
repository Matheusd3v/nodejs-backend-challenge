"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const login_1 = require("./login");
const todo_1 = require("./todo");
const user_1 = require("./user");
const routes = (app) => {
    (0, user_1.userRoutes)(app);
    (0, login_1.loginRoute)(app);
    (0, todo_1.todoRoute)(app);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map