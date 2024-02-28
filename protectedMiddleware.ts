import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';
import { verify, Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

export class ProtectedMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access denied, token missing' });
        }

        verify(token, process.env.JWTSECRET as Secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    }
}

