import { Router } from 'express';
import { categoryData} from '../data/CategoryData';

export const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
    res.json(categoryData);
});