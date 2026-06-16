export type ErrorCode = {
    code: number;
    message: string;
};

export const ErrorCode = {
    BAD_REQUEST: { code: 400, message: "Bad Request" },
    NOT_FOUND: { code: 404, message: "Resource not found" },
} as const;