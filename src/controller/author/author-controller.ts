import {Author, CreateAuthorDTO} from "../../interface/authors.js";
import {AuthorService} from "../../service/author-service.js";
import {Request, Response} from "express";

export const AuthorController = {
    getAllAuthors: async (req: Request, res: Response): Promise<void> => {
        try{
            const authors: Author[] = await AuthorService.getAllAuthors();
            res.status(200).json(authors);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching authors" });
        }
    },

    getAuthorById: async (req: Request, res: Response): Promise<void> => {
        try{
            const { id } = req.params as { id: string };
            const author: Author = await AuthorService.getAuthorById(id);
            res.status(200).json(author);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching author" });
        }
    },

    createAuthor: async (req: Request, res: Response): Promise<void> => {
        try{
            const authorData: CreateAuthorDTO = req.body;
            const newAuthor = await AuthorService.createAuthor(authorData);
            res.status(201).json(newAuthor);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error creating author" });
        }
    }
}   