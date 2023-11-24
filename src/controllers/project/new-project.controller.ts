import Project from '@/models/project.model'
import Plan from '@/models/plan.model'
import { TErrorResponse, TProjectInput, TProject, TPlanModel, TProjectModel, TLanguage, TCurrency } from '@/types/types'
import { getNextSequence } from '@/lib/counter'
import crypto from 'crypto'

type TPayload = {
    currencies: TCurrency[];
    languages: TLanguage[];
}

export default async function CreateProject({userId, name, currencies, languages}: TProjectInput, payload: TPayload): Promise<TErrorResponse | {project: TProject}> {
    try {
        if (!name) {
            return {error: 'invalid_request'};
        }

        name = name.trim();
        if (name.length < 1 || name.length > 40) {
            return {error: 'invalid_request', description: 'Number of characters from 4 to 20.', property: 'name'};
        }

        const plan: TPlanModel|null = await Plan.findOne({default: true});
        if (!plan) {
            return {error: 'invalid_plan'};
        }

        const seq = await getNextSequence('projectId');
        const token = 'secret_' + crypto.randomBytes(32).toString('hex');
        const trialFinishedAt = new Date(Date.now()+3600*24*3*1000);

        const project: TProjectModel = await Project.create({
            userId, 
            name,
            number: seq,
            projectNumber: 1000 + seq,
            token,
            plan: plan.code,
            trialFinishedAt,
            currencies,
            languages
        });
        if (!project) {
            return {error: 'invalid_project'};
        }

        const currenciesOutput  = project.currencies.map(c => ({
            code: c.code, primary: c.primary, 
            name: payload.currencies.find(cur => cur.code === c.code)?.name ?? 'unknown'
        }));

        const languagesOutput = project.languages.map(l => ({
            code: l.code, primary:l.primary, 
            name: payload.languages.find(lang => lang.code === l.code)?.name ?? 'unknown'
        }));
        
        const output = {
            id: project.id,
            userId: project.userId,
            name: project.name,
            projectNumber: project.projectNumber,
            plan: project.plan,
            planFinishedAt: project.planFinishedAt,
            trialFinishedAt: project.trialFinishedAt,
            currencies: currenciesOutput,
            languages: languagesOutput,
        };

        return {project: output};
    } catch (error) {
        throw error;
    }
}