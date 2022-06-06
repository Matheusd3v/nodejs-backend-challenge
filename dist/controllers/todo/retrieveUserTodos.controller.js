"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserTodosController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const retrieveUserTodosController = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const todoList = await (0, services_1.retrieveUsersTodoService)(userId);
        return res.status(200).json(todoList);
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, error);
    }
};
exports.retrieveUserTodosController = retrieveUserTodosController;
//# sourceMappingURL=retrieveUserTodos.controller.js.map