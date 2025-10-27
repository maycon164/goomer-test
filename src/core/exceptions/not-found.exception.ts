export class NotFoundException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}