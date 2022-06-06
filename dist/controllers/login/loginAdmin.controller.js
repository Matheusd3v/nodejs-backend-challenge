"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminController = void 0;
const errors_1 = require("../../errors");
const loginAdmin_service_1 = require("../../services/login/loginAdmin.service");
const loginAdminController = async (req, res) => {
    try {
        const { email, password, adminKey } = req.validated;
        const token = await (0, loginAdmin_service_1.loginAdminService)(email, password, adminKey);
        return res.status(200).json({ message: "success", token });
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.loginAdminController = loginAdminController;
//# sourceMappingURL=loginAdmin.controller.js.map