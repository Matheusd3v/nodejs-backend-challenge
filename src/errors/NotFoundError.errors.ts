import httpStatus from "http-status";

import { ErrorHandler } from "./errorHandler";

export class NotFoundError extends ErrorHandler {
    constructor(description: string) {
        super(httpStatus.NOT_FOUND, description);
    }
}
