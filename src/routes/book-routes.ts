import Router from "express";
import {BookController} from "../controller/book/book-controller.js";

const router = Router();
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBookById);
router.post("/", BookController.createBook);
router.put("/:id", BookController.updateBookById);
router.delete("/:id", BookController.deleteBookById);
router.get("/:id/author/:authorId", BookController.getBookByIdAndAuthorId);

export default router;