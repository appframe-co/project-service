import express, { Request, Response, NextFunction } from 'express';
import ProjectsController from '@/controllers/project/projects.controller'
import NewProjectController from '@/controllers/project/new-project.controller'
import ProjectController from '@/controllers/project/project.controller'
import EditProjectController from '@/controllers/project/edit-project.controller'
import { TCurrency, TErrorResponse, TLanguage } from '@/types/types';

const router = express.Router();

function isErrorCurrencies(data: TErrorResponse|{currencies: TCurrency[]}): data is TErrorResponse {
    return !!(data as TErrorResponse).error;
}
function isErrorLanguages(data: TErrorResponse|{languages: TLanguage[]}): data is TErrorResponse {
    return !!(data as TErrorResponse).error;
}

async function getLanguages() {
    const resFetch = await fetch(`${process.env.URL_SYSTEM_SERVICE}/api/languages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return resFetch.json();
}
async function getCurrencies() {
    const resFetch = await fetch(`${process.env.URL_SYSTEM_SERVICE}/api/currencies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return resFetch.json();
}
router.use(async function (req: Request, res: Response, next: NextFunction): Promise<void| Response> {
    try {
        const currenciesPromise:Promise<TErrorResponse|{currencies:TCurrency[]}> = getCurrencies();
        const languagesPromise:Promise<TErrorResponse|{languages:TLanguage[]}> = getLanguages();

        const [currenciesData, languagesData] = await Promise.all([currenciesPromise, languagesPromise]);
        
        if (!isErrorCurrencies(currenciesData)) {
            res.locals.currencies = currenciesData.currencies;
        }
        if (!isErrorLanguages(languagesData)) {
            res.locals.languages = languagesData.languages;
        }

        next();
    } catch(err) {
        next(err);
    }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, token} = req.query as {userId: string, token: string};

        const {currencies, languages} = res.locals;

        const data = await ProjectsController({
            userId,
            token
        }, {languages, currencies});

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

        const currencies = [{code: 'ILS', primary: true}];
        const languages = [{code: 'en', primary: true}];

        const data = await NewProjectController({
            userId,
            name,
            currencies,
            languages
        }, {languages: res.locals.languages, currencies: res.locals.currencies});

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
        const {currencies, languages} = res.locals;

        const data = await ProjectController({
            userId,
            id
        }, {languages, currencies});

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

        let { id, name, currencies, languages } = req.body;

        if (id !== req.params.id) {
            throw new Error('Project ID error');
        }

        const data = await EditProjectController({
            userId,
            id,
            name,
            currencies,
            languages
        }, {languages: res.locals.languages, currencies: res.locals.currencies});

        res.json(data);
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;