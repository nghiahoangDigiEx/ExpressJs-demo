import authorRouter from "./author-routes.js";
import bookRouter from "./book-routes.js";
import categoryRouter from "./category-routes.js";
import Router from "express";

const apiRouter = Router();
apiRouter.use("/authors", authorRouter);
apiRouter.use("/books", bookRouter);
apiRouter.use("/categories", categoryRouter);

export default apiRouter;
