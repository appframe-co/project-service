import Project from '@/models/project.model';
import { TErrorResponse, TProjectInput, TProject, TLanguage, TCurrency } from '@/types/types'

type TPayload = {
    currencies: TCurrency[];
    languages: TLanguage[];
}

export default async function UpdateProject({userId, id, name, currencies, languages}: TProjectInput&{id:string}, payload: TPayload): Promise<TErrorResponse | {project: TProject}> {
    try {
        if (!id) {
            return {error: 'invalid_request'};
        }

        if (name) {
            name = name.trim();
            if (name.length < 1 || name.length > 40) {
                return {error: 'invalid_request', description: 'Number of characters from 4 to 20.', property: 'name'};
            }
        }

        const updatedAt = new Date();

        const project: TProject|null  = await Project.findOneAndUpdate({
            userId, 
            _id: id
        }, {name, currencies, languages, updatedAt});
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