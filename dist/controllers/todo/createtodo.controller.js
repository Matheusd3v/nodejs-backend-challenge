"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const createTodoController = async (req, res) => {
    try {
        const { validated } = req;
        const { userId } = req.decoded;
        const newTodo = await (0, services_1.createTodoService)(validated, userId);
        return res.status(201).json(newTodo);
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.createTodoController = createTodoController;
//# sourceMappingURL=createtodo.controller.js.map