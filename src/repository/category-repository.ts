import fs from "fs/promises";
import { Category, CreateCategoryDTO } from "../interface/categories.js";
import { Environment } from "../config/environment.js";

export const CategoryRepository = {
    getCategoryById: async(id: string): Promise<Category | null> => {
        try{
            const data = await fs.readFile(Environment.CATEGORIES_FILE_PATH, "utf-8");
            const categories = JSON.parse(data) as Category[];
            return categories.find(category => category.id === id) || null;
        }
        catch(error){
            throw new Error("Error fetching category");
        }
    },
    getAllCategories: async(): Promise<Category[]> => {
        try{
            const data = await fs.readFile(Environment.CATEGORIES_FILE_PATH, "utf-8");
            if(!data){
                throw new Error("No categories found");
            }
            return JSON.parse(data) as Category[];
        }
        catch(error){
            throw new Error("Error fetching categories");
        }
     },

    createCategory: async(category: CreateCategoryDTO): Promise<Category> => {
        try{
            const categories = await CategoryRepository.getAllCategories();
            const newCategory: Category = {
                id: String(Number(categories[categories.length - 1]?.id ?? "0") + 1),
                name: category.name
            };
            categories.push(newCategory);
            await fs.writeFile(Environment.CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));
            return newCategory;
        }
        catch(error){
            throw new Error("Error creating category");
        }
    }
}