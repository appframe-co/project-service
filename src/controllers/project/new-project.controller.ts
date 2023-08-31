import Project from '@/models/project.model'
import { TErrorResponse, TProjectInput, TProject } from '@/types/types'
import { getNextSequence } from '@/lib/counter'
import crypto from 'crypto'

export default async function CreateProject({userId, name}: TProjectInput): Promise<TErrorResponse | {project: TProject}> {
    try {
        if (!name) {
            return {error: 'invalid_request'};
        }

        name = name.trim();
        if (name.length < 1 || name.length > 40) {
            return {error: 'invalid_request', description: 'Number of characters from 4 to 20.', property: 'name'};
        }

        const seq = await getNextSequence('projectId');

        const token = 'secret_' + crypto.randomBytes(32).toString('hex');

        const project = await Project.create({
            userId, 
            name,
            number: seq,
            projectNumber: 1000 + seq,
            token
        });
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