import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';
import { verify } from 'jsonwebtoken';

interface ExtendedRequest extends Request {
    user?: any; 
}

export class JwtMiddleware extends Middleware {
    public handle(req: ExtendedRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access denied, token missing' });
        }

        if (!process.env.JWTSECRET) {
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        verify(token, process.env.JWTSECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    }
}
