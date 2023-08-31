import express, { Request, Response, NextFunction } from 'express';
import ProjectsController from '@/controllers/project/projects.controller'
import NewProjectController from '@/controllers/project/new-project.controller'
import ProjectController from '@/controllers/project/project.controller'
import EditProjectController from '@/controllers/project/edit-project.controller'

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, token} = req.query as {userId: string, token: string};

        const data = await ProjectsController({
            userId,
            token
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            throw new Error('UserId required');
        }

        let { name } = req.body;

        const data = await NewProjectController({
            userId,
            name
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            throw new Error('UserId required');
        }

        const {id} = req.params;

        const data = await ProjectController({
            userId,
            id
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            throw new Error('UserId required');
        }

        let { id, name } = req.body;

        if (id !== req.params.id) {
            throw new Error('Project ID error');
        }

        const data = await EditProjectController({
            userId,
            id,
            name
        });

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;