import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';

export class LoggerMiddleware extends Middleware {
    static log: any;
    public handle(req: Request, res: Response, next: NextFunction) {
        console.log(req.method, req.path);
        next();
    }
}
