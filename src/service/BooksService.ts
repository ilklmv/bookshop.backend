import { BookRepository } from "../repository/BookRepository";
import { Book } from "../interface/Book";

export class BooksService {
    [x: string]: any;
    private readonly bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async getBooks(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }
}