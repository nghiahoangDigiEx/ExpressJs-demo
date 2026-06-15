import {AuthorRepository} from "../repository/author-repository.js";
import {Author, CreateAuthorDTO} from "../interface/authors.js";

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
                throw new Error("Author not found");
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
    }
}