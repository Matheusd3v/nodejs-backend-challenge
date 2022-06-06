"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoService = void 0;
const repositories_1 = require("../../repositories");
const utils_1 = require("../../utils");
const myDateLib_util_1 = require("../../utils/myDateLib.util");
const createTodoService = async (data, userId) => {
    const sentenceIntitlecase = await (0, utils_1.titleCaseFunction)(data.description);
    const dateConverted = await new myDateLib_util_1.MyDateLib().brazilianUtcToGlobalUtc(data.deadline);
    const newTodo = {
        deadline: dateConverted,
        description: sentenceIntitlecase,
    };
    const { user, ...todo } = await new repositories_1.TodoRepository().createTodo(newTodo, userId);
    return todo;
};
exports.createTodoService = createTodoService;
//# sourceMappingURL=createTodo.service.js.map