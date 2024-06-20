import Project from '@/models/project.model'
import {TCurrency, TErrorResponse, TLanguage, TProject} from '@/types/types'

type TPayload = {
    currencies: TCurrency[];
    languages: TLanguage[];
}

export default async function Projects(
    {userId, token}: 
    {userId: string, token: string}, payload: TPayload): Promise<TErrorResponse | {projects: TProject[]}> {
    try {
        const filter: any = {};

        if (userId) {
            filter['userId'] = userId;
        }
        if (token) {
            filter['token'] = token;
        }

        if (!Object.keys(filter).length) {
            return {error: 'invalid_request'};
        }

        const projects: TProject[] = await Project.find(filter);
        if (!projects) {
            return {error: 'invalid_project'};
        }

        const output = projects.map(project => {
            const currencies = project.currencies.map(c => ({
                code: c.code, primary: c.primary, 
                name: payload.currencies.find(cur => cur.code === c.code)?.name ?? 'unknown'
            }));

            const languages = project.languages.map(l => ({
                code: l.code, primary:l.primary, 
                name: payload.languages.find(lang => lang.code === l.code)?.name ?? 'unknown'
            }));

            return {
                id: project.id,
                userId: project.userId,
                name: project.name,
                projectNumber: project.projectNumber,
                plan: project.plan,
                planFinishedAt: project.planFinishedAt,
                trialFinishedAt: project.trialFinishedAt,
                currencies,
                languages,
                front: {
                    title: project.front.title
                }
            };
        });

        return {projects: output};
    } catch (error) {
        throw error;
    }
}