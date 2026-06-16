import { SortDate } from "../constant/enums/sort-date.js";

export type CreateBookDTO = Omit<Book, "id" | "createdDate">;
export type UpdateBookDTO = Partial<Omit<Book, "id" | "createdDate">>;
export const CreateBookValidate = {
    "name": {type: "string", isRequired: true},
    "authorId": {type: "string", isRequired: true},
    "categoryIds": {type: "array", isRequired: false},
    "content": {type: "string", isRequired: true},
    "publishedDate": {type: "string", isRequired: true}
}

export const UpdateBookValidate = {
    "name": {type: "string", isRequired: false},
    "authorId": {type: "string", isRequired: false},
    "categoryIds": {type: "array", isRequired: false},
    "content": {type: "string", isRequired: false},
    "publishedDate": {type: "string", isRequired: false}
}

export const QueryBooksValidate = {
    "categoryId": {type: "string", isRequired: false},
    "authorId": {type: "string", isRequired: false},
    "page": {type: "number", isRequired: false},
    "limit": {type: "number", isRequired: false},
    "sortPublishedDate": {type: "string", isRequired: false, enumType: SortDate},
    "sortCreatedDate": {type: "string", isRequired: false, enumType: SortDate}
}

export interface ListBooksDTO {
    authorId: string;
    name: string;
    createdDate: string;
    publishedDate: string;
}
export interface Book{
    id: string;
    name: string;
    authorId: string;
    categoryIds: string[];
    content: string;
    publishedDate: string;
    createdDate: string;
}