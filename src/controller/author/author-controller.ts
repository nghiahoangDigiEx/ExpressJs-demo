import {Author, CreateAuthorDTO} from "../../interface/authors.js";
import {AuthorService} from "../../service/author-service.js";
import {Request, Response} from "express";
import {handleError} from "../../errors/HandleError.js";
import {ApiResponse} from "../../interface/response/api-response.js";
import {Book} from "../../interface/books.js";

export const AuthorController = {
    getAllAuthors: async (req: Request, res: Response): Promise<void> => {
        try{
            const authors: Author[] = await AuthorService.getAllAuthors();
            const response: ApiResponse<Author[]> = new ApiResponse(authors, "Authors fetched successfully");
            res.status(200).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    },

    getAuthorById: async (req: Request, res: Response): Promise<void> => {
        try{
            const { id } = req.params as { id: string };
            const author: Author = await AuthorService.getAuthorById(id);
            const response: ApiResponse<Author> = new ApiResponse(author, "Author fetched successfully");
            res.status(200).json(response);
        }
        catch(error){
            handleError(error, res);}
    },

    createAuthor: async (req: Request, res: Response): Promise<void> => {
        try{
            const authorData: CreateAuthorDTO = req.body;
            const newAuthor = await AuthorService.createAuthor(authorData);
            const response: ApiResponse<Author> = new ApiResponse(newAuthor, "Author created successfully");
            res.status(201).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    },

    getBooksByAuthorId: async (req: Request, res: Response): Promise<void> => {
        try{
            const { id } = req.params as { id: string };
            const books = await AuthorService.getBooksByAuthorId(id);
            const response: ApiResponse<Book[]> = new ApiResponse(books, "Books by author fetched successfully");
            res.status(200).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    }
}   