import Project from '@/models/project.model'
import { TErrorResponse, TProjectInput } from '@/types/types'
import { getNextSequence } from '@/lib/counter'

export default async function CreateProject({userId, name}: TProjectInput): Promise<TErrorResponse | {id: string}> {
    try {
        if (!name) {
            return {error: 'invalid_request'};
        }

        name = name.trim();
        if (name.length < 1 || name.length > 40) {
            return {error: 'invalid_request', description: 'Number of characters from 4 to 20.', property: 'name'};
        }

        const seq = await getNextSequence('projectId');

        const newProject = await Project.create({
            userId, 
            name,
            number: seq,
            projectNumber: 1000 + seq
        });
        if (!newProject) {
            return {error: 'invalid_project'};
        }

        return {id: newProject.id};
    } catch (error) {
        throw error;
    }
}