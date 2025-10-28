import { Request, Response, NextFunction } from "express";
import {BaseErrorException} from "../../core/exceptions/base-error-exception";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    console.error(err);

    if (err instanceof BaseErrorException) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
        });
    }

    res.status(500).json({ error: "Internal server error" });
}
