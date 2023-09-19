import Plan from '@/models/plan.model'
import {TErrorResponse, TPlan, TPlanModel} from '@/types/types'

export default async function Plans({code}: {code: string}): Promise<TErrorResponse | {plans: TPlan[]}> {
    try {
        const filter: any = {};

        if (code) {
            filter['code'] = code;
        }

        const plans: TPlanModel[] = await Plan.find(filter);

        const output = plans.map(plan => ({
            id: plan.id,
            name: plan.name,
            code: plan.code,
            default: plan.default,
            features: plan.features.map(f => ({
                code: f.code,
                rules: f.rules
            }))
        }));

        return {plans: output};
    } catch (error) {
        throw error;
    }
}