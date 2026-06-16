import { Response } from "express";
import { ErrorCustom } from "./ErrorCustom.js";

export function handleError(error: unknown, res: Response): void {
    if (error instanceof ErrorCustom) {
        res.status(error.errorCode.code).json({
            message: error.message
        });
        return;
    }

    res.status(500).json({
        message: error instanceof Error
            ? error.message
            : "Internal Server Error"
    });
}