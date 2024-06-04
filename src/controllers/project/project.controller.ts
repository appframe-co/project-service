import Project from '@/models/project.model'
import {TCurrency, TErrorResponse, TLanguage, TProject} from '@/types/types'

type TPayload = {
    currencies: TCurrency[];
    languages: TLanguage[];
}

export default async function ProjectController({id}: {id: string}, payload: TPayload): Promise<TErrorResponse | {project: TProject}> {
    try {
        const project: TProject|null = await Project.findOne({_id: id});
        if (!project) {
            return {error: 'invalid_project'};
        }

        const currencies = project.currencies.map(c => ({
            code: c.code, primary: c.primary, 
            name: payload.currencies.find(cur => cur.code === c.code)?.name ?? 'unknown'
        }));
        
        const languages = project.languages.map(l => ({
            code: l.code, primary: l.primary, 
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
            currencies,
            languages
        };

        return {project: output};
    } catch (error) {
        throw error;
    }
}