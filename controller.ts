import { Router, Request, Response, NextFunction } from 'express';

    interface IMiddleware {
        handle: (req: Request, res: Response, next: NextFunction) => void;
    }

    interface ControllerRoute {
        [x: string]: any;
        method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
        routePath: string;
        fn: (req: Request, res: Response, next: NextFunction) => void;
        middleware: IMiddleware[];
    }
    
    export class Controller {
        private _router: Router;
    
        constructor() {
            this._router = Router();
        }
    
        protected bindRoutes(routes: ControllerRoute[]) {
            routes.forEach((route) => {
                // Не забываем сохранить this
                const ctxHandler = route.fn.bind(this);

                const routeHandlers = route.middleware ? [...route.middleware.map((m) => m.handle), ctxHandler] : [ctxHandler];

                this._router[route.method ?? 'get'](route.path, routeHandlers);
            })
        }
    }