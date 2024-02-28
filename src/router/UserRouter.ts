import { Router } from 'express';
import { userData } from '../data/UserData';

export const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.json(userData);
});