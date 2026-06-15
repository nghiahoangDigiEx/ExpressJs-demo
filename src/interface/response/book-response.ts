import { BaseResponse } from "./base.js";
import { Book, ListBooksDTO } from "../books.js";
export interface BookResponse extends BaseResponse {
    data: Book;
}

export interface BookListResponse extends BaseResponse {
    data: ListBooksDTO[],    
    total: number;
    page: number;
    limit: number;
}