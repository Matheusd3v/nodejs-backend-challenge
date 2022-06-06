"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateMiddleware = void 0;
const errors_1 = require("../errors");
const paginateMiddleware = async (req, res, next) => {
    try {
        let page = 1;
        let per_page = 10;
        if (req.query.page) {
            if (Number(req.query.page) < 1) {
                throw new errors_1.BadRequestError("The page must be 1 or greater than 1.");
            }
            page = Number(req.query.page);
        }
        if (req.query.per_page) {
            if (Number(req.query.per_page) < 1) {
                throw new errors_1.BadRequestError("The per_page number must be 1 or greater than 1.");
            }
            per_page = Number(req.query.per_page);
        }
        req.paginated = { page, per_page };
        return next();
    }
    catch (error) {
        return new errors_1.CatchError().catch(error, res);
    }
};
exports.paginateMiddleware = paginateMiddleware;
//# sourceMappingURL=paginate.middleware.js.map