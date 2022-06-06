"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resgisterUserController = void 0;
const services_1 = require("../../services");
const resgisterUserController = async (req, res) => {
    try {
        const { validated } = req;
        const user = await (0, services_1.createUserService)(validated);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.resgisterUserController = resgisterUserController;
//# sourceMappingURL=registerUser.controller.js.map