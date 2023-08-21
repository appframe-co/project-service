import Project from '@/models/project.model'
import {TErrorResponse, TProjectOutput} from '@/types/types'

export default async function Projects({userId}: {userId: string}): Promise<TErrorResponse | {projects: TProjectOutput[]}> {
    try {
        const projects = await Project.find({userId});
        if (!projects) {
            return {error: 'invalid_project'};
        }

        const output = projects.map(project => ({
            id: project.id,
            name: project.name,
            projectNumber: project.projectNumber
        }));

        return {projects: output};
    } catch (error) {
        throw error;
    }
}