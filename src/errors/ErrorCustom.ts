import { ErrorCode } from "./ErrorCode.js";
export class ErrorCustom extends Error {
    constructor(message: string, public errorCode: ErrorCode) {
        super(message);
    }
}