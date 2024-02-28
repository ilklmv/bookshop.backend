import { Router } from 'express';
import { bookData } from '../data/BookData';

export const bookRouter = Router();

bookRouter.get('/', (req, res) => {
    res.json(bookData);
});

// Другие маршруты для CRUD операций с книгами

