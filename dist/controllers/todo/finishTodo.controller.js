"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishTodoController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const finishTodoController = async (req, res) => {
    try {
        const { todo } = req;
        const message = await (0, services_1.finishTodoService)(todo);
        return res.status(200).json(message);
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.finishTodoController = finishTodoController;
//# sourceMappingURL=finishTodo.controller.js.map