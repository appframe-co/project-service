import Project from '@/models/project.model'
import {TErrorResponse, TProject} from '@/types/types'

export default async function ProjectController({userId, id}: {userId: string, id: string}): Promise<TErrorResponse | {project: TProject}> {
    try {
        const project = await Project.findOne({_id: id, userId});
        if (!project) {
            return {error: 'invalid_project'};
        }

        const output = {
            id: project.id,
            name: project.name,
            projectNumber: project.projectNumber
        };

        return {project: output};
    } catch (error) {
        throw error;
    }
}