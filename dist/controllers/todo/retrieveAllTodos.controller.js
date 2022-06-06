"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAllTodosController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const retrieveAllTodosController = async (req, res) => {
    try {
        const { paginated } = req;
        const { overdue } = req.query;
        const todos = await (0, services_1.retrieveAllTodosService)(paginated, overdue);
        return res.status(200).json(todos);
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.retrieveAllTodosController = retrieveAllTodosController;
//# sourceMappingURL=retrieveAllTodos.controller.js.map