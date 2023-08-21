import express, { Request, Response, NextFunction } from 'express';
import ProjectsController from '@/controllers/project/projects.controller'
import NewProjectController from '@/controllers/project/new-project.controller'
import ProjectController from '@/controllers/project/project.controller'

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = res.locals;

        const data = await ProjectsController({
            userId
        });

        const response = {
            status: 200,
            data,
            message: null
        };
        res.json(response);
    } catch (e) {
        res.json({
            data: {error: 'error'}
        });
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = res.locals;
        let { name } = req.body;

        const data = await NewProjectController({
            userId,
            name
        });

        const response = {
            status: 200,
            data,
            message: null
        };
        res.json(response);
    } catch (e) {
        res.json({
            data: {error: 'error'}
        });
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = res.locals;
        const {id} = req.params;

        const data = await ProjectController({
            userId,
            id
        });

        const response = {
            status: 200,
            data,
            message: null
        };
        res.json(response);
    } catch (e) {
        res.json({
            data: {error: 'error'}
        });
    }
});

export default router;