import { Request, Response, NextFunction } from 'express';

export abstract class Middleware {
    public abstract handle(req: Request, res: Response, next: NextFunction): void;
}
