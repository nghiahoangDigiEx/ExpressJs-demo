import {CategoryController} from "../controller/category/category-controller.js";
import Router from "express";

const router = Router();
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);

export default router;