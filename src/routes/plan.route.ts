import express, { Request, Response, NextFunction } from 'express';
import PlansController from '@/controllers/plan/plans.controller'

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {code} = req.query as {code: string};

        const data = await PlansController({code});

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;