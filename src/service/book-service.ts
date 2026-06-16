import {BookRepository} from "../repository/book-repository.js";
import {CreateBookDTO, ListBooksDTO, UpdateBookDTO} from "../interface/books.js";
import {Book} from "../interface/books.js";
import {AuthorRepository} from "../repository/author-repository.js";
import { CategoryRepository } from "../repository/category-repository.js";
import { SortDate } from "../constant/enums/sort-date.js";
import {ErrorCustom} from "../errors/ErrorCustom.js";
import {ErrorCode} from "../errors/ErrorCode.js";


export const BookService = {
    getBooks: async(categoryId: string, authorId: string, page: number, limit: number, sortPublishedDate?: SortDate, sortCreatedDate?: SortDate): Promise<ListBooksDTO[]> => {
        try{
            const books = await BookRepository.getAllBooks();
            console.log('Date types of publishedDate and createdDate:', books.map(book => ({
                publishedDateType: typeof book.publishedDate,
                createdDateType: typeof book.createdDate
            })));
            let filteredBooks = books;

            if(categoryId){
                filteredBooks = filteredBooks.filter(book => book.categoryIds.includes(categoryId));
            }

            if(authorId){
                filteredBooks = filteredBooks.filter(book => book.authorId === authorId);
            }
            if(filteredBooks.length === 0){
                throw new ErrorCustom("No books found", ErrorCode.NOT_FOUND);
            }
            if(sortPublishedDate!==undefined || sortCreatedDate!==undefined){
                console.log(`Sorting books by published date: ${sortPublishedDate}, created date: ${sortCreatedDate}`);
                filteredBooks = BookService.sortBooks(filteredBooks, sortPublishedDate, sortCreatedDate);
            }
            const startIndex = (page - 1) * limit;
            if(startIndex >= filteredBooks.length){
                throw new ErrorCustom("Page number out of range", ErrorCode.BAD_REQUEST);
            }
            const endIndex = startIndex + limit;
            filteredBooks = filteredBooks.slice(startIndex, endIndex);
            return filteredBooks.map(book => ({
                authorId: book.authorId,
                name: book.name,
                createdDate: book.createdDate,
                publishedDate: book.publishedDate
            }));
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching books");
        }
    },

    getBookById: async(id: string): Promise<Book> => {
        try{
            const book = await BookRepository.getBookById(id);
            if(!book){
                throw new ErrorCustom("Book not found", ErrorCode.NOT_FOUND);
            }
            return book;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching book");
        }
    },

    createBook: async(book: CreateBookDTO): Promise<Book> => {
        try{
            console.log(`Received book data: ${JSON.stringify(book)}`);
            const author = await AuthorRepository.getAuthorById(book.authorId);
            console.log(`Author found: ${JSON.stringify(author)}`);
            if(!author){
                throw new ErrorCustom("Author not found", ErrorCode.NOT_FOUND);
            }
            if(!book.categoryIds || book.categoryIds.length === 0){
                throw new ErrorCustom("At least one category is required", ErrorCode.BAD_REQUEST);
            }
            console.log(`Validating categories: ${JSON.stringify(book.categoryIds)}`);
            const allcategories = await CategoryRepository.getAllCategories();
            for(const categoryId of book.categoryIds){
                const category = allcategories.find(cat => cat.id === categoryId);
                if(!category){
                    throw new ErrorCustom(`Category with ID ${categoryId} not found`, ErrorCode.NOT_FOUND);
                }
            }
            console.log(`Creating book: ${JSON.stringify(book)}`);
            const newBook = await BookRepository.createBook(book);
            console.log(`Book created with ID: ${newBook.id}`);
            return newBook;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error creating book");
        }
    },

    deleteBookById: async(id: string): Promise<string> => {
        try{
            const book = await BookRepository.getBookById(id);
            if(!book){
                throw new ErrorCustom("Book not found", ErrorCode.NOT_FOUND);
            }
            await BookRepository.deleteBookById(id);
            return "Book deleted successfully";
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error deleting book");
        }
    },

    updateBookById: async(id: string, updatedBook: UpdateBookDTO): Promise<Book> => {
        try{
            const book = await BookRepository.getBookById(id);
            if(!book){
                throw new ErrorCustom("Book not found", ErrorCode.NOT_FOUND);
            }
            if(updatedBook.authorId){
                const author = await AuthorRepository.getAuthorById(updatedBook.authorId);
                if(!author){
                    throw new ErrorCustom("Author not found", ErrorCode.NOT_FOUND);
                }
            }
            if(updatedBook.categoryIds){
                const allcategories = await CategoryRepository.getAllCategories();
                for(const categoryId of updatedBook.categoryIds){
                    const category = allcategories.find(cat => cat.id === categoryId);
                    if(!category){
                        throw new ErrorCustom(`Category with ID ${categoryId} not found`, ErrorCode.NOT_FOUND);
                    }
                }
            }
            if(updatedBook.publishedDate && new Date(updatedBook.publishedDate) > new Date(book.createdDate)){
                throw new ErrorCustom("Published date cannot be after created date", ErrorCode.BAD_REQUEST);
            }
            return BookRepository.updateBookById(id, updatedBook);
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error updating book");
        }
    },

    getBookByIdAndAuthorId: async(id: string, authorId: string): Promise<Book> => {
        try{
            const book = await BookRepository.getBookById(id);
            if(!book || book.authorId !== authorId){
                throw new ErrorCustom("Book not found for this author", ErrorCode.NOT_FOUND);
            }  
            return book;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching book by ID and author ID");
        }
    },
    sortBooks: (books: Book[], sortPublishedDateAsc?: SortDate, sortCreatedDateAsc?: SortDate): Book[] => {
        books.sort((a, b) => {
            if(sortCreatedDateAsc){
                if(a.createdDate < b.createdDate) return sortCreatedDateAsc === SortDate.ASC ? -1 : 1;
                if(a.createdDate > b.createdDate) return sortCreatedDateAsc === SortDate.ASC ? 1 : -1;
            }
            if(sortPublishedDateAsc){
                if(a.publishedDate < b.publishedDate) return sortPublishedDateAsc === SortDate.ASC ? -1 : 1;
                if(a.publishedDate > b.publishedDate) return sortPublishedDateAsc === SortDate.ASC ? 1 : -1;
            }
            return 0;
        });
        console.log(`Books after sorting: ${JSON.stringify(books)}`);
        return books;
    }
}
