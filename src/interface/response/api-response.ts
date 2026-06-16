import { Status } from "../../constant/enums/status.js";

export class ApiResponse<T>{
    constructor(data: T, message?: string) {
        this.data = data;
        this.code = 200;
        this.status = Status.SUCCESS;
        this.message = message || "Operation successful";
    }

    code: number;
    status: Status;
    message: string;
    data: T;

    setCode(code: number): this {
        this.code = code;
        return this;
    }
    setStatus(status: Status): this {
        this.status = status;
        return this;
    }
    setMessage(message: string): this {
        this.message = message;
        return this;
    }
    
}