import {BaseErrorException} from "./base-error-exception";

export class BadRequestException extends BaseErrorException {
    constructor(message: string) {
        super(message, 400, "BadRequestException");
    }
}
