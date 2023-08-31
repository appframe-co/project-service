import express, { Request, Response, NextFunction } from 'express';
import AccessTokenController from '@/controllers/access-token/access-token.controller'

const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const userId = req.query.userId as string;
        if (!userId) {
            throw new Error('UserId required');
        }

        const data = await AccessTokenController({
            userId,
            id
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;