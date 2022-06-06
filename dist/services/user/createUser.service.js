"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../../repositories");
const createUserService = async (userData) => {
    const hashedPass = await bcrypt_1.default.hash(userData.password, 10);
    const { id, email, ..._ } = await new repositories_1.UserRepository().createUser({
        ...userData,
        password: hashedPass,
    });
    return { id, email };
};
exports.createUserService = createUserService;
//# sourceMappingURL=createUser.service.js.map