import { Request, Response, NextFunction } from 'express';
import { RoutesInput } from '@/types/types'
import jwt, { JwtPayload } from 'jsonwebtoken'
import project from './project.route'

type CustomJwtPayload = JwtPayload & { userId: string };

export default ({ app }: RoutesInput) => {
    app.use(async function (req: Request, res: Response, next: NextFunction): Promise<void| Response> {
        try {
            const {authorization: accessToken} = req.headers;

            if (!accessToken) {
                return res.status(401).json({message: 'Invalid token'});
            }

            const {userId} = jwt.verify(accessToken, process.env.JWT_SECRET as string) as CustomJwtPayload;
            if (!userId) {
                return res.status(401).json({message: 'Invalid token'});
            }

            res.locals.userId = userId;

            next();
        } catch(err) {
            next(err);
        }
    });

    app.use('/api/projects', project);
};