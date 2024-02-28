import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';

export class ValidateMiddleware extends Middleware {
    public static validateRegistrationData(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'Email and password are required' });
        }

        // Валидация адреса электронной почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({ error: 'Invalid email address' });
        }

        // Проверка длины пароля
        if (password.length < 6) {
            return res.status(422).json({ error: 'Password must be at least 6 characters long' });
        }

        next();
    }

    public static validateLoginData(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'Email and password are required' });
        }
        next();
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(422).json({ error: 'No username or password' });
        } else {
            next();
        }
    }
}
