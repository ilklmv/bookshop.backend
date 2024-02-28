import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';
import { verify } from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';

interface ExtendedRequest extends Request {
    user?: any; 
}

export class AuthMiddleware extends Middleware {
    static handle: RequestHandler<ParamsDictionary, any, any, any>;
    registerUser(body: any) {
        throw new Error('Method not implemented.');
    }
    login(email: any, password: any) {
        throw new Error('Method not implemented.');
    }
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
