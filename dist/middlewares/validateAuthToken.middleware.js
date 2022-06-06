"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const errors_1 = require("../errors");
const validateAuthToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new errors_1.UnauthoziredError("Missing authorization headers");
        }
        jsonwebtoken_1.default.verify(token, configs_1.jwtConfig.secretKey, (e, decoded) => {
            if (e) {
                throw new errors_1.UnauthoziredError(e.message);
            }
            const { userId } = decoded;
            if (!userId) {
                throw new errors_1.UnauthoziredError("Invalid token.");
            }
            req.decoded = { userId };
            return next();
        });
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.validateAuthToken = validateAuthToken;
//# sourceMappingURL=validateAuthToken.middleware.js.map