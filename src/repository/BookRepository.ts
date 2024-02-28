import DatabaseService from '../service/DatabaseService';
import { Book } from '../interface/Book';

export class BookRepository {
    private readonly dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async findAll(): Promise<Book[]> {
        // Логика для получения всех книг из базы данных
        return await this.dbService.query('SELECT * FROM books');
    }

    async findById(bookId: string | number): Promise<Book | null> {
        // Логика для поиска книги по идентификатору
        const book = await this.dbService.query(`SELECT * FROM books WHERE id = ${bookId}`);
        return book ? book[0] : null;
    }

    async create(data: any): Promise<Book | null> {
        // Логика для создания новой книги в базе данных
        const result = await this.dbService.query('INSERT INTO books SET ?', data);
        if (result && result.insertId) {
            return { ...data, id: result.insertId };
        }
        return null;
    }
}
