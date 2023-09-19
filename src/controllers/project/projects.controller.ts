import Project from '@/models/project.model'
import {TErrorResponse, TProject} from '@/types/types'

export default async function Projects(
    {userId, token}: 
    {userId: string, token: string}): Promise<TErrorResponse | {projects: TProject[]}> {
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

        const projects = await Project.find(filter);
        if (!projects) {
            return {error: 'invalid_project'};
        }

        const output = projects.map(project => ({
            id: project.id,
            userId: project.userId,
            name: project.name,
            projectNumber: project.projectNumber,
            plan: project.plan
        }));

        return {projects: output};
    } catch (error) {
        throw error;
    }
}