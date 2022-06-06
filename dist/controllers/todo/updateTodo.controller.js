"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const updateTodoController = async (req, res) => {
    try {
        const { todo, validated } = req;
        const todoUpdated = await (0, services_1.updateTodoService)(validated, todo);
        return res.status(200).json(todoUpdated);
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.updateTodoController = updateTodoController;
//# sourceMappingURL=updateTodo.controller.js.map