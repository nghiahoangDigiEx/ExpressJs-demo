import { BaseResponse } from "./base.js";
export interface AuthorResponse extends BaseResponse {
    data: {
        id: string;
        name: string;
        createdDate: string;
    }
}
export interface AuthorListResponse extends BaseResponse {
    data: {
        id: string;
        name: string;
        createdDate: string;
    }[],    
}