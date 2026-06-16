import {Category, CreateCategoryDTO} from "../../interface/categories.js";
import {CategoryService} from "../../service/category-service.js";
import {Request, Response} from "express";
import {handleError} from "../../errors/HandleError.js";
import {ApiResponse} from "../../interface/response/api-response.js";

export const CategoryController = {
    getAllCategories: async (req: Request, res: Response): Promise<void> => {
        try{
            const categories: Category[] = await CategoryService.getAllCategories();
            const response: ApiResponse<Category[]> = new ApiResponse(categories, "Categories fetched successfully");
            res.status(200).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    },

    getCategoryById: async (req: Request, res: Response): Promise<void> => {
        try{
            const { id } = req.params as { id: string };
            const category: Category = await CategoryService.getCategoryById(id);
            const response: ApiResponse<Category> = new ApiResponse(category, "Category fetched successfully");
            res.status(200).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    },

    createCategory: async (req: Request, res: Response): Promise<void> => {
        try{
            const categoryData: CreateCategoryDTO = req.body;
            const newCategory = await CategoryService.createCategory(categoryData);
            const response: ApiResponse<Category> = new ApiResponse(newCategory, "Category created successfully");
            res.status(201).json(response);
        }
        catch(error){
            handleError(error, res);
        }
    }
}