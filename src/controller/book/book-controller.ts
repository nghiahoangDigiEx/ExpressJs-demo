import { BookService } from "../../service/book-service.js";
import { CreateBookDTO, UpdateBookDTO, CreateBookValidate, UpdateBookValidate, QueryBooksValidate, Book } from "../../interface/books.js";
import { Request, Response } from "express";
import {SortDate} from "../../constant/enums/sort-date.js";
import { validate } from "../../validate/validate.js";
import {BookListResponse} from "../../interface/response/book-response.js";
import {ApiResponse} from "../../interface/response/api-response.js";
import {ErrorCustom} from "../../errors/ErrorCustom.js";
import {handleError} from "../../errors/HandleError.js";

export const BookController = {
    getBooks: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.query, QueryBooksValidate);
            const { categoryId, 
                authorId, 
                page = 1, 
                limit = 10, 
                sortPublishedDate, 
                sortCreatedDate } = req.query as 
                                    {categoryId: string, 
                                    authorId: string, 
                                    page?: string, 
                                    limit?: string, 
                                    sortPublishedDate?: string, 
                                    sortCreatedDate?: string };                          
            const books = await BookService.getBooks(categoryId, authorId, Number(page), Number(limit), sortPublishedDate as SortDate, sortCreatedDate as SortDate);
            const response: ApiResponse<BookListResponse> = new ApiResponse({
                data: books,
                total: books.length,
                page: Number(page),
                limit: Number(limit)
            }, "Books fetched successfully");
            res.json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    },

    getBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params as { id: string };
            const book = await BookService.getBookById(id);
            const response: ApiResponse<Book> = new ApiResponse(book, "Book fetched successfully");
            res.json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    },

    createBook: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.body, CreateBookValidate);
            const bookData: CreateBookDTO = req.body;
            console.log(`Received book data: ${JSON.stringify(bookData)}`);
            const newBook = await BookService.createBook(bookData);
            console.log(`Book created with ID: ${newBook.id}`);
            const response: ApiResponse<Book> = new ApiResponse(newBook, "Book created successfully");
            res.status(201).json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    },

    updateBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.body, UpdateBookValidate);
            const { id } = req.params as { id: string };
            
            const bookData: UpdateBookDTO = req.body;
            const updatedBook = await BookService.updateBookById(id, bookData);
            const response: ApiResponse<Book> = new ApiResponse(updatedBook, "Book updated successfully");
            res.status(200).json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    },

    deleteBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params as { id: string };
            const message = await BookService.deleteBookById(id);
            const response: ApiResponse<string> = new ApiResponse(message);
            res.json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    },

    getBookByIdAndAuthorId: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, authorId } = req.params as { id: string, authorId: string };
            const books = await BookService.getBookByIdAndAuthorId(id, authorId);
            const response: ApiResponse<Book> = new ApiResponse(books, "Book fetched successfully");
            res.json(response);
        }
        catch (error) {
            handleError(error, res);
        }
    }
}
