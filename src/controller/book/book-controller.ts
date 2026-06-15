import { BookService } from "../../service/book-service.js";
import { CreateBookDTO, UpdateBookDTO, CreateBookValidate, UpdateBookValidate, QueryBooksValidate } from "../../interface/books.js";
import { Request, Response } from "express";
import {SortDate} from "../../enums/sort-date.js";
import { validate } from "../../validate/validate.js";
import { NotFoundError} from "../../errors/NotFoundError.js";
import { BadRequestError } from "../../errors/BadRequestError.js";
import {BookListResponse, BookResponse} from "../../interface/response/book-response.js";

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
            const response: BookListResponse = {
                status: "success",
                message: "Books fetched successfully",
                data: books,
                total: books.length,
                page: Number(page),
                limit: Number(limit)
            };
            res.status(200).json(response);
        }
        catch (error) {
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching books" });
            }
        }
    },

    getBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params as { id: string };
            validate(req.params, { id: { type: "string", isRequired: true } });
            const book = await BookService.getBookById(id);
            const response: BookResponse = {
                status: "success",
                message: "Book fetched successfully",
                data: book,
            };

            res.status(200).json(response);
        }
        catch (error) {
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching book" });
            }
        }
    },

    getBooksByAuthorId: async (req: Request, res: Response): Promise<void> => {
        try{
            validate(req.params, { authorId: { type: "string", isRequired: true } });
            const { authorId } = req.params as { authorId: string };
            const books = await BookService.getBooksByAuthorId(authorId);
            const response: BookListResponse = {
                status: "success",
                message: "Books fetched successfully",
                data: books,
                total: books.length,
                page: 1,
                limit: books.length        
            };
            res.status(200).json(response);
        }
        catch(error){
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching books by author" });
            }
        }
    },

    createBook: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.body, CreateBookValidate);
            const bookData: CreateBookDTO = req.body;
            console.log(`Received book data: ${JSON.stringify(bookData)}`);
            const newBook = await BookService.createBook(bookData);
            console.log(`Book created with ID: ${newBook.id}`);
            const response: BookResponse = {
                status: "success",
                message: "Book created successfully",
                data: newBook
            };
            res.status(201).json(response);
        }
        catch (error) {
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error creating book" });
            }
        }
    },

    updateBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.body, UpdateBookValidate);
            validate(req.params, { id: { type: "string", isRequired: true } });
            const { id } = req.params as { id: string };
            
            const bookData: UpdateBookDTO = req.body;
            const updatedBook = await BookService.updateBookById(id, bookData);
            const response: BookResponse = {
                status: "success",
                message: "Book updated successfully",
                data: updatedBook
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof BadRequestError) {
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error updating book" });
            }
        }
    },

    deleteBookById: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.params, { id: { type: "string", isRequired: true } });
            const { id } = req.params as { id: string };
            const message = await BookService.deleteBookById(id);
            res.status(204).json({message});
        }
        catch (error) {
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error deleting book" });
            }
        }
    },

    getBookByIdAndAuthorId: async (req: Request, res: Response): Promise<void> => {
        try {
            validate(req.params, { id: { type: "string", isRequired: true }, authorId: { type: "string", isRequired: true } });
            const { id, authorId } = req.params as { id: string, authorId: string };
            const books = await BookService.getBookByIdAndAuthorId(id, authorId);
            const response: BookResponse = {
                status: "success",
                message: "Book fetched successfully",
                data: books
            };
            res.status(200).json(response);
        }
        catch (error) {
            if(error instanceof BadRequestError){
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching books" });
            }
        }
    }
}
