"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoShape = void 0;
const yup = __importStar(require("yup"));
const myDateLib_util_1 = require("../../utils/myDateLib.util");
const createTodoShape = yup.object().shape({
    description: yup.string().trim().lowercase().required(),
    deadline: yup
        .string()
        .trim()
        .matches(new myDateLib_util_1.MyDateLib().deadlinePattern, "deadline must have format 'dd/mm/yyyy 24:59:59' ")
        .required(),
});
exports.createTodoShape = createTodoShape;
//# sourceMappingURL=createTodo.shape.js.map