"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.validated;
        const token = await (0, services_1.loginUserService)(email, password);
        return res.status(200).json({ message: "success", token });
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.loginUserController = loginUserController;
//# sourceMappingURL=loginUserController.js.map