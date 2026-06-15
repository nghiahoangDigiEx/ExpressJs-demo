import express from 'express';
import bookRoutes from './routes/book-routes.js';
import authorRoutes from './routes/author-routes.js';
import categoryRoutes from './routes/category-routes.js';

const app = express();
app.use(express.json()); 
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);

export default app;