"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../../configs");
const errors_1 = require("../../errors");
const repositories_1 = require("../../repositories");
const loginUserService = async (email, password) => {
    const user = await new repositories_1.UserRepository().findUser({ email }, true);
    if (!user) {
        throw new errors_1.UnauthoziredError("Email and password don't match.");
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new errors_1.UnauthoziredError("Email and password don't match.");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, configs_1.jwtConfig.secretKey, {
        expiresIn: configs_1.jwtConfig.expiresIn,
    });
    return token;
};
exports.loginUserService = loginUserService;
//# sourceMappingURL=loginUser.service.js.map