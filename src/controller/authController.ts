import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthMiddleware } from '../../authMiddleware';
import { Controller } from '../../controller';
import { ValidateMiddleware } from '../../validateMiddleware';

export class AuthController extends Controller {
    constructor(private authService: AuthMiddleware) {
        super();
        this.bindRoutes([
            {
                routePath: '/register',
                method: 'post',
                path: '/register',
                fn: this.register.bind(this),
                middleware: [ValidateMiddleware.validateRegistrationData],
            },
            {
                routePath: '/login',
                method: 'post',
                path: '/login',
                fn: this.login.bind(this),
                middleware: [ValidateMiddleware.validateLoginData],
            },
        ]);
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await this.authService.registerUser(req.body);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
}
