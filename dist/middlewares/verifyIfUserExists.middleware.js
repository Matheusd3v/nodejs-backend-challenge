"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserExists = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const verifyUserExists = async (req, res, next) => {
    try {
        const { email } = req.validated;
        const userExists = await new repositories_1.UserRepository().findUser({ email });
        if (userExists) {
            throw new errors_1.ConflictError("This user already exists.");
        }
        return next();
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.verifyUserExists = verifyUserExists;
//# sourceMappingURL=verifyIfUserExists.middleware.js.map