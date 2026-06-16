import {ErrorCustom} from "../errors/ErrorCustom.js";
import {ErrorCode} from "../errors/ErrorCode.js";

export const validate = (data: Record<string, any>, schema: Record<string,any>) => {
    for (const key in schema) {
        const value = data[key];
        const field = schema[key];
        if (field.isRequired && (value === undefined || value === null)
        ) {
            throw new ErrorCustom(`Missing required field: ${key}`, ErrorCode.BAD_REQUEST);
        }
        if(value === undefined) {
            continue;
        }
        if (field.type === "number") {
            const parsed = Number(value);

            if (Number.isNaN(parsed)) {
                throw new ErrorCustom(`Invalid value for field: ${key}. Expected a number.`, ErrorCode.BAD_REQUEST);
            }
        }
        else if (getTypeOrArray(value) !== field.type) {
            throw new ErrorCustom(`Invalid type for field: ${key}. Expected ${field.type}`, ErrorCode.BAD_REQUEST);
        }

        if (field.enumType){
            const enumValues = Object.values(field.enumType);
            if (!enumValues.includes(value)) {
                throw new ErrorCustom(
                    `Invalid value for field: ${key}. Expected one of: ${enumValues.join(", ")}`,
                    ErrorCode.BAD_REQUEST
                );
            }
        }
    }
}

const getTypeOrArray = (value: any): string => {
    return Array.isArray(value) ? "array" : typeof value;
}