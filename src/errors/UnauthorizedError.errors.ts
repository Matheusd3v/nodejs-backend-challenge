import httpStatus from "http-status";

import { ErrorHandler } from "./errorHandler";

export class UnauthoziredError extends ErrorHandler {
    constructor(description: string) {
        super(httpStatus.UNAUTHORIZED, description);
    }
}
