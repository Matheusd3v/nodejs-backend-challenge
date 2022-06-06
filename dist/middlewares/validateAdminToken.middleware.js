"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const validateAdminToken = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new errors_1.UnauthoziredError("Missing authorization headers");
        }
        jsonwebtoken_1.default.verify(token, configs_1.jwtConfig.secretKey, async (e, decoded) => {
            if (e) {
                throw new errors_1.UnauthoziredError(e.message);
            }
            const { isAdmin, adminKey, email } = decoded;
            if (!isAdmin) {
                throw new errors_1.UnauthoziredError("Invalid admin credentials.");
            }
            const user = await new repositories_1.AdminRepository().findAdmin(email);
            const match = await bcrypt_1.default.compare(adminKey, user.adminKey);
            if (!match) {
                throw new errors_1.UnauthoziredError("Invalid admin credentials.");
            }
            return next();
        });
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.validateAdminToken = validateAdminToken;
//# sourceMappingURL=validateAdminToken.middleware.js.map