import {Category, CreateCategoryDTO} from "../../interface/categories.js";
import {CategoryService} from "../../service/category-service.js";
import {Request, Response} from "express";

export const CategoryController = {
    getAllCategories: async (req: Request, res: Response): Promise<void> => {
        try{
            const categories: Category[] = await CategoryService.getAllCategories();
            res.status(200).json(categories);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching categories" });
        }
    },

    getCategoryById: async (req: Request, res: Response): Promise<void> => {
        try{
            const { id } = req.params as { id: string };
            const category: Category = await CategoryService.getCategoryById(id);
            res.status(200).json(category);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error fetching category" });
        }
    },

    createCategory: async (req: Request, res: Response): Promise<void> => {
        try{
            const categoryData: CreateCategoryDTO = req.body;
            const newCategory = await CategoryService.createCategory(categoryData);
            res.status(201).json(newCategory);
        }
        catch(error){
            res.status(500).json({ message: error instanceof Error ? error.message : "Error creating category" });
        }
    }
}