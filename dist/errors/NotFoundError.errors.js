"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errorHandler_1 = require("./errorHandler");
class NotFoundError extends errorHandler_1.ErrorHandler {
    constructor(description) {
        super(http_status_1.default.NOT_FOUND, description);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.errors.js.map