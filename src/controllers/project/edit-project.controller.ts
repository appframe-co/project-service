import Project from '@/models/project.model';
import { TErrorResponse, TProjectInput, TProject } from '@/types/types'

export default async function UpdateProject({userId, id, name, currencies}: TProjectInput&{id:string}): Promise<TErrorResponse | {project: TProject}> {
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
        }, {name, currencies, updatedAt});
        if (!project) {
            return {error: 'invalid_project'};
        }

        const output = {
            id: project.id, 
            name: project.name, 
            projectNumber: project.projectNumber,
            plan: project.plan,
            planFinishedAt: project.planFinishedAt,
            trialFinishedAt: project.trialFinishedAt,
            currencies: project.currencies,
        };

        return {project: output};
    } catch (error) {
        throw error;
    }
}