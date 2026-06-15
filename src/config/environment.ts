import dotenv from "dotenv";
dotenv.config();

export const Environment = {
    PORT: process.env.PORT || 3000,
    BOOKS_FILE_PATH: "src/json/books.json",
    AUTHORS_FILE_PATH: "src/json/authors.json",
    CATEGORIES_FILE_PATH: "src/json/categories.json"
}