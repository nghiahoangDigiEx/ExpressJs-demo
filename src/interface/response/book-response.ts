import { Book, ListBooksDTO } from "../books.js";

export interface BookListResponse {
    data: ListBooksDTO[],    
    total: number;
    page: number;
    limit: number;
}