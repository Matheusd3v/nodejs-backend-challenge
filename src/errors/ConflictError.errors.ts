import httpStatus from "http-status";

import { ErrorHandler } from "./errorHandler";

export class ConflictError extends ErrorHandler {
    constructor(description: string) {
        super(httpStatus.CONFLICT, description);
    }
}
