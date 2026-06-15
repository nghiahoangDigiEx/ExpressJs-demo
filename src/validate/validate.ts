import { BadRequestError } from "../errors/BadRequestError.js";

export const validate = (data: Record<string, any>, schema: Record<string,any>) => {
    for (const key in schema) {
        const value = data[key];
        const field = schema[key];
        if (field.isRequired && (value === undefined || value === null)
        ) {
            throw new BadRequestError(`Missing required field: ${key}`);
        }
        if(value === undefined) {
            continue;
        }
        if (field.type === "number") {
            const parsed = Number(value);

            if (Number.isNaN(parsed)) {
                throw new BadRequestError(`Invalid value for field: ${key}. Expected a number.`);
            }
        }
        else if (getTypeOrArray(value) !== field.type) {
            throw new BadRequestError(`Invalid type for field: ${key}. Expected ${field.type}`);
        }

        if (field.enumType){
            const enumValues = Object.values(field.enumType);
            if (!enumValues.includes(value)) {
                throw new BadRequestError(
                    `Invalid value for field: ${key}. Expected one of: ${enumValues.join(", ")}`
                );
            }
        }
    }
}

const getTypeOrArray = (value: any): string => {
    return Array.isArray(value) ? "array" : typeof value;
}