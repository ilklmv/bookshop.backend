import express, { Express } from 'express';
import dotenv from 'dotenv';
import { bookRouter } from './router/BooksRouter';
import { userRouter } from './router/UserRouter';
import { categoryRouter } from './router/CategoryRouter';

export class App {
    [x: string]: any;
    private app: Express;

    constructor() {
        dotenv.config();
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
        // Другие middleware, если необходимо
    }

    private routes(): void {
        this.app.use('/api/books', bookRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/categories', categoryRouter);
        // Другие маршруты
    }

    public listen(): void {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
