import {AuthorRepository} from "../repository/author-repository.js";
import {Author, CreateAuthorDTO} from "../interface/authors.js";
import {ErrorCustom} from "../errors/ErrorCustom.js";
import {ErrorCode} from "../errors/ErrorCode.js";
import { BookRepository } from "../repository/book-repository.js";


export const AuthorService = {
    getAllAuthors: async(): Promise<Author[]> => {
        try{
            return AuthorRepository.getAllAuthors(); 
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching authors");
        }
    },
    getAuthorById: async(id: string): Promise<Author> => {
        try{
            const author = await AuthorRepository.getAuthorById(id);
            if(!author){
                throw new ErrorCustom("Author not found", ErrorCode.NOT_FOUND);
            }
            return author;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching author");
        }
    },

    createAuthor: async(author: CreateAuthorDTO): Promise<Author> => {
        try{
            return AuthorRepository.createAuthor(author);
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error creating author");
        }
    },

    getBooksByAuthorId: async(authorId: string): Promise<any[]> => {
        try{
            const author = await AuthorRepository.getAuthorById(authorId);
            if(!author){
                throw new ErrorCustom("Author not found", ErrorCode.NOT_FOUND);
            }
            const books = await BookRepository.getAllBooks();
            return books.filter(book => book.authorId === authorId);
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching books by author");
        }
    }
}