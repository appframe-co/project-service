import Project from '@/models/project.model'
import {TErrorResponse} from '@/types/types'

export default async function ProjectController(
    {userId, id}: {userId: string, id: string}): 
    Promise<TErrorResponse | {projectId: string, accessToken: string}> 
{
    try {
        const project = await Project.findOne({_id: id, userId});
        if (!project) {
            return {error: 'invalid_project'};
        }        

        const output = {
            projectId: project.id,
            accessToken: project.token
        };

        return output;
    } catch (error) {
        throw error;
    }
}