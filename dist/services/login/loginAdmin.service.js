"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../../configs");
const errors_1 = require("../../errors");
const repositories_1 = require("../../repositories");
const loginAdminService = async (email, password, adminKey) => {
    const user = await new repositories_1.AdminRepository().findAdmin(email);
    if (!user) {
        throw new errors_1.UnauthoziredError("Invalid admin credentials!");
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    const matchAdmin = await bcrypt_1.default.compare(adminKey, user.adminKey);
    if (!match || !matchAdmin) {
        throw new errors_1.UnauthoziredError("Invalid admin credentials!");
    }
    const token = jsonwebtoken_1.default.sign({ isAdmin: true, adminKey, email }, configs_1.jwtConfig.secretKey, {
        expiresIn: configs_1.jwtConfig.expiresIn,
    });
    return token;
};
exports.loginAdminService = loginAdminService;
//# sourceMappingURL=loginAdmin.service.js.map