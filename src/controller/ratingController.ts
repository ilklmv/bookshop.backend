import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../controller';

export class RatingController extends Controller {
    public async addRating(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookId, rating } = req.body;.

            res.status(201).json({ message: 'Rating added successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
