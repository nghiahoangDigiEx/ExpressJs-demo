import { Book, CreateBookDTO, UpdateBookDTO } from "../interface/books.js";
import fs from "fs/promises";
import { Environment } from "../config/environment.js";

export const BookRepository = {
    getAllBooks: async(): Promise<Book[]> => {
        try{
            const data = await fs.readFile(Environment.BOOKS_FILE_PATH, "utf-8");
            return JSON.parse(data) as Book[];
        }
        catch(error){
            throw new Error("Error reading books file");
        }
    },

    getBookById: async(id: string): Promise<Book | null> => {
        try{
            const books = await BookRepository.getAllBooks();
            return books.find(book => book.id === id) || null;
        }
        catch(error){
            throw new Error("Error reading books file");
        }
    },

    createBook: async(book: CreateBookDTO): Promise<Book> => {
        try{
            const books = await BookRepository.getAllBooks();
            console.log(`Creating book: ${JSON.stringify(books)}`);
            const createdDate = new Date().toISOString().split("T")[0];
            const publishedDate = book.publishedDate.split("T")[0];
            const newBook: Book = {
                id: String(Number(books[books.length - 1]?.id ?? "0") + 1),
                name: book.name || "Untitled",
                authorId: book.authorId || "0",
                categoryIds: book.categoryIds || [],
                content: book.content || "",
                publishedDate: publishedDate || new Date().toISOString(),
                createdDate: createdDate || new Date().toISOString(),
            };
            books.push(newBook);
            console.log(`Books after adding new book: ${JSON.stringify(books)}`);
            await fs.writeFile(Environment.BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
            console.log(`Book created with ID: ${newBook.id}`);
            return newBook;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error creating book");
        }
    },

    deleteBookById: async(id: string): Promise<void> => {
        try{
            const books = await BookRepository.getAllBooks();
            const updatedBooks = books.filter(book => book.id !== id);
            await fs.writeFile(Environment.BOOKS_FILE_PATH, JSON.stringify(updatedBooks, null, 2));
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error deleting book");
        }
    },

    updateBookById: async(id: string, updatedBook: UpdateBookDTO): Promise<Book> => {
        try{
            const books = await BookRepository.getAllBooks();
            const bookIndex = books.findIndex(book => book.id === id);
            if(bookIndex === -1){
                throw new Error("Book not found");
            }
            books[bookIndex] = {
                ...books[bookIndex],
                ...updatedBook,
                id: books[bookIndex]!.id,
                createdDate: books[bookIndex]!.createdDate
            } as Book;
            await fs.writeFile(Environment.BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
            return books[bookIndex];
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error updating book");
        }
    }
}
