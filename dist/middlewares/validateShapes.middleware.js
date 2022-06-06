"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateShape = void 0;
const validateShape = (shape) => async (req, res, next) => {
    try {
        const validated = await shape.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        req.validated = validated;
        return next();
    }
    catch (error) {
        return res.status(400).json(error.errors);
    }
};
exports.validateShape = validateShape;
//# sourceMappingURL=validateShapes.middleware.js.map