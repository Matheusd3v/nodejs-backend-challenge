import httpStatus from "http-status";

import { ErrorHandler } from "./errorHandler";

export class BadRequestError extends ErrorHandler {
    constructor(description: string) {
        super(httpStatus.BAD_REQUEST, description);
    }
}
