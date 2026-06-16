import Router from "express";
import {AuthorController} from "../controller/author/author-controller.js";

const router = Router();
router.get("/", AuthorController.getAllAuthors);
router.get("/:id", AuthorController.getAuthorById);
router.post("/", AuthorController.createAuthor);
router.get("/:id/books", AuthorController.getBooksByAuthorId);

export default router;