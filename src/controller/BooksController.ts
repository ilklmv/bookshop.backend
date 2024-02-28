import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BooksService } from '../service/BooksService';
import { TYPES } from '../../types';
import { LoggerMiddleware } from '../../loggerMiddleware';

@injectable()
export class BookController {
    constructor(@inject(TYPES.BookService) private bookService: BooksService) {}

    async getBooks(req: Request, res: Response) {
        LoggerMiddleware.log(req, res, async () => {
            const books = await this.bookService.getAllBooks();
            console.log(books);
        });
    }
}
