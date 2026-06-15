import {Category, CreateCategoryDTO} from "../interface/categories.js";
import {CategoryRepository} from "../repository/category-repository.js";

export const CategoryService = {
    getAllCategories: async(): Promise<Category[]> => {
        try{
            return CategoryRepository.getAllCategories();
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching categories");
        }
    },

    getCategoryById: async(id: string): Promise<Category> => {
        try{
            const category = await CategoryRepository.getCategoryById(id);
            if(!category){
                throw new Error("Category not found");
            }
            return category;
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error fetching category");
        }
    },

    createCategory: async(category: CreateCategoryDTO): Promise<Category> => {
        try{
            return CategoryRepository.createCategory(category);
        }
        catch(error){
            throw (error instanceof Error) ? error : new Error("Error creating category");
        }
    }
}