import { App } from './src/App';
    import * as dotenv from 'dotenv';

    import 'reflect-metadata';
    import { Container } from 'inversify';
    import { BookController } from './src/controller/BooksController';
    import { BooksService } from './src/service/BooksService';
    import { BookRepository } from './src/repository/BookRepository';
    import { TYPES } from './types';

    // dotend получать доступ к env-переменным из файла .env
    dotenv.config();
    
    async function bootstrap() {
        const iocContainer = new Container()
        iocContainer.bind<BookController>(TYPES.BookController).to(BookController);
        iocContainer.bind<BooksService>(TYPES.BookService).to(BooksService);
        iocContainer.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
    
        const bookController = iocContainer.get<BookController>(TYPES.BookController);
        await bookController.getBooks();
    }
    
    bootstrap();

