import Project from '@/models/project.model'
import Plan from '@/models/plan.model'
import { TErrorResponse, TProjectInput, TProject, TPlanModel, TProjectModel } from '@/types/types'
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

        const plan: TPlanModel|null = await Plan.findOne({default: true});
        if (!plan) {
            return {error: 'invalid_plan'};
        }

        const seq = await getNextSequence('projectId');
        const token = 'secret_' + crypto.randomBytes(32).toString('hex');
        const trialFinishedAt = new Date(Date.now()+3600*24*3*1000);

        const project: TProjectModel = await Project.create({
            userId, 
            name,
            number: seq,
            projectNumber: 1000 + seq,
            token,
            plan: plan.code,
            trialFinishedAt
        });
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
        };

        return {project: output};
    } catch (error) {
        throw error;
    }
}