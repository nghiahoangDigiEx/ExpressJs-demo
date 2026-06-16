import fs from "fs/promises";
import { Author, CreateAuthorDTO } from "../interface/authors.js";
import { Environment } from "../config/environment.js";
import { ErrorCustom } from "../errors/ErrorCustom.js";
import { ErrorCode } from "../errors/ErrorCode.js";
export const AuthorRepository = {
    getAuthorById: async(id: string): Promise<Author | null> => {
        try{
            const data = await fs.readFile(Environment.AUTHORS_FILE_PATH, "utf-8");
            console.log(`Reading authors file: ${data}`);
            const authors = JSON.parse(data) as Author[];
            return authors.find(author => author.id === id) || null;
        }
        catch(error){
            throw new Error("Error fetching author");
        }
    },
    getAllAuthors: async(): Promise<Author[]> => {
        try{
            const data = await fs.readFile(Environment.AUTHORS_FILE_PATH, "utf-8");
            console.log(`Reading authors file: ${data}`);
            if(!data){
                throw new ErrorCustom("No authors found", ErrorCode.NOT_FOUND);
            }
            return JSON.parse(data) as Author[];
        }
        catch(error){
            throw new Error("Error fetching authors");
        }
    },

    createAuthor: async(author: CreateAuthorDTO): Promise<Author> => {
        try{
            const authors = await AuthorRepository.getAllAuthors();
            const newAuthor: Author = {
                id: String(Number(authors[authors.length - 1]?.id ?? "0") + 1),
                name: author.name
            };
            authors.push(newAuthor);
            await fs.writeFile(Environment.AUTHORS_FILE_PATH, JSON.stringify(authors,null,2));
            return newAuthor;
        }
        catch(error){
            throw new Error("Error creating author");
        }
    }
}