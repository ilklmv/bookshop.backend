export interface Book {
    [x: string]: any;
    id: number;
    title: string;
    author: string;
    category: string;
    price: number;
    publication: number;
    rating: number;
}

export class BookRepository {
    [x: string]: any;
    public async createBook(bookData: Book) {
        await this.dbService.getClient().book.create({
            data: bookData
        })
    }
}