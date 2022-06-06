"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchError = void 0;
const typeorm_1 = require("typeorm");
const errorHandler_1 = require("./errorHandler");
class CatchError {
    /**
     * catch
     */
    catch(err, res) {
        if (err instanceof errorHandler_1.ErrorHandler) {
            const { status, description } = err;
            return res.status(status).json({ error: description });
        }
        if (err instanceof typeorm_1.QueryFailedError) {
            if (err.driverError.errno === 1062) {
                return res.status(409).json({
                    error: `This unique item is already saved.`,
                });
            }
            return res.status(500).json({ message: "unexpected db error." });
        }
        return res.status(500).json(err);
    }
}
exports.CatchError = CatchError;
//# sourceMappingURL=catchError.js.map