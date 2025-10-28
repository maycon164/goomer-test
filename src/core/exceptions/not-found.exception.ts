import {BaseErrorException} from "./base-error-exception";

export class NotFoundException extends BaseErrorException {
    constructor(message: string) {
        super(message, 404, "NotFoundException");
    }
}
