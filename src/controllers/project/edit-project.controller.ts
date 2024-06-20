import Project from '@/models/project.model';
import { TProjectInput, TProject, TLanguage, TCurrency, TProjectModel } from '@/types/types'
import { validateArray } from '@/utils/validators/array.validator';
import { validateBoolean } from '@/utils/validators/boolean.validator';
import { validateString } from '@/utils/validators/string.validator';

type TPayload = {
    currencies: TCurrency[];
    languages: TLanguage[];
}

function isErrorProject(data: null|TProjectModel): data is null {
    return (data as null) === null;
}

export default async function UpdateProject(projectInput: TProjectInput, payload: TPayload): Promise<{project: TProject|null, userErrors: any}> {
    try {
        const {userId, id: projectId, ...projectBody} = projectInput;

        if (!userId || !projectId) {
            throw new Error('userId & projectId required');
        }

        const {errors: errorsForm, data: validatedData} = await (async (data, payload) => {
            try {
                const errors: any = [];
                const output: any = {};

                output.project = await (async function() {
                    const project: any = {};

                    if (data.hasOwnProperty('name')) {
                        const {name} = data;
                        if (name !== undefined && name !== null) {
                            const [errorsName, valueName] = validateString(name, {required: true, min: 2, max: 20});
                            if (errorsName.length > 0) {
                                errors.push({field: ['name'], message: errorsName[0]}); 
                            }
                            project.name = valueName;
                        }
                    }

                    if (data.hasOwnProperty('currencies')) {
                        const {currencies} = data;
                        if (currencies !== undefined && currencies !== null) {
                            const [errorsCurrencies, valueCurrencies] = validateArray(currencies, {required: false, max: 5});
                            if (errorsCurrencies.length > 0) {
                                errors.push({field: ['currencies'], message: errorsCurrencies[0]});
                            }

                            project.currencies = valueCurrencies.map((v:any, k:number) => {
                                const {code, primary, name} = v;

                                const [errorsCode, valueCode] = validateString(code, {required: true, max: 5});
                                if (errorsCode.length > 0) {
                                    errors.push({field: ['currencies', k, 'code'], message: errorsCode[0]}); 
                                }

                                const [errorsPrimary, valuePrimary] = validateBoolean(primary);
                                if (errorsPrimary.length > 0) {
                                    errors.push({field: ['currencies', k, 'primary'], message: errorsPrimary[0]}); 
                                }

                                const [errorsName, valueName] = validateString(name, {required: true, max: 255});
                                if (errorsName.length > 0) {
                                    errors.push({field: ['currencies', k, 'name'], message: errorsName[0]}); 
                                }

                                return {
                                    code: valueCode,
                                    primary: valuePrimary,
                                    name: valueName,
                                };
                            });
                        }
                    }

                    if (data.hasOwnProperty('languages')) {
                        const {languages} = data;
                        if (languages !== undefined && languages !== null) {
                            const [errorsLanguages, valueLanguages] = validateArray(languages, {required: false, max: 5});
                            if (errorsLanguages.length > 0) {
                                errors.push({field: ['languages'], message: errorsLanguages[0]});
                            }

                            project.languages = valueLanguages.map((v:any, k:number) => {
                                const {code, primary, name} = v;

                                const [errorsCode, valueCode] = validateString(code, {required: true, max: 5});
                                if (errorsCode.length > 0) {
                                    errors.push({field: ['languages', k, 'code'], message: errorsCode[0]}); 
                                }

                                const [errorsPrimary, valuePrimary] = validateBoolean(primary);
                                if (errorsPrimary.length > 0) {
                                    errors.push({field: ['languages', k, 'primary'], message: errorsPrimary[0]}); 
                                }

                                const [errorsName, valueName] = validateString(name, {required: true, max: 255});
                                if (errorsName.length > 0) {
                                    errors.push({field: ['languages', k, 'name'], message: errorsName[0]}); 
                                }

                                return {
                                    code: valueCode,
                                    primary: valuePrimary,
                                    name: valueName,
                                };
                            });
                        }
                    }

                    if (data.hasOwnProperty('front')) {
                        const {front} = data;
                        if (front !== undefined && front !== null) {
                            project['front'] = {};

                            if (front.hasOwnProperty('title')) {
                                const {title} = front;
                                if (title !== undefined && title !== null) {
                                    const [errorsTitle, valueTitle] = validateString(title);
                                    if (errorsTitle.length > 0) {
                                        errors.push({field: ['front', 'title'], message: errorsTitle[0]}); 
                                    }
                                    project.front.title = valueTitle;
                                }
                            }
                            if (front.hasOwnProperty('logo')) {
                                const {logo} = front;
                                if (logo !== undefined && logo !== null) {
                                    const [errorsLogo, valueLogo] = validateString(logo);
                                    if (errorsLogo.length > 0) {
                                        errors.push({field: ['front', 'logo'], message: errorsLogo[0]}); 
                                    }
                                    project.front.logo = valueLogo;
                                }
                            }
                        }
                    }

                    return project;
                }());

                return {errors, data: output};
            } catch (e) {
                let message = 'Error';
                if (e instanceof Error) {
                    message = e.message;
                }

                return {errors: [{message}]};
            }
        })(projectBody);
        if (Object.keys(errorsForm).length > 0) {
            return {
                project: null,
                userErrors: errorsForm
            };
        }

        const {errors: errorsDB, data: savedData} = await (async (data, payload) => {
            try {
                const {projectId} = payload;

                const errors: any = [];
                const output: any = {projectId};

                const project: TProjectModel|null = await Project.findOneAndUpdate({
                    userId, 
                    _id: projectId
                }, {...data.project});
                if (isErrorProject(project)) {
                    throw new Error('invalid project');
                }

                if (errors.length > 0) {
                    return {errors};
                }

                return {errors, data: output};
            } catch (e) {
                let message;
                if (e instanceof Error) {
                    message = e.message;
                }
                return {errors: [{message}]};
            }
        })(validatedData, {projectId});
        if (Object.keys(errorsDB).length > 0) {
            return {
                project: null,
                userErrors: errorsDB
            }
        }

        const {errors: errorsRes, data: obtainedData} = await (async (data): Promise<{errors: any, data: {project: TProject|null}}> => {
            try {
                const errors: any = [];
                let output: {project: TProject|null} = {project: null};

                const {projectId} = data;

                const project: TProjectModel|null = await Project.findOne({userId, _id: projectId});
                if (isErrorProject(project)) {
                    output.project = null;
                } else {
                    output.project = {
                        id: project.id, 
                        userId: project.userId,
                        name: project.name, 
                        plan: project.plan,
                        planFinishedAt: project.planFinishedAt,
                        trialFinishedAt: project.trialFinishedAt,
                        projectNumber: project.projectNumber,
                        currencies: project.currencies.map(c => ({
                            code: c.code, primary: c.primary, 
                            name: payload.currencies.find(cur => cur.code === c.code)?.name ?? 'unknown'
                        })),
                        languages: project.languages.map(l => ({
                            code: l.code, primary:l.primary, 
                            name: payload.languages.find(lang => lang.code === l.code)?.name ?? 'unknown'
                        })),
                        front: {
                            title: project.front.title,
                        }
                    }
                }

                return {errors, data: output};
            } catch (e) {
                let message;
                if (e instanceof Error) {
                    message = e.message;
                }
                return {errors: [{message}], data: {project: null}};
            }
        })(savedData);
        if (Object.keys(errorsRes).length > 0) {
            return {
                project: null,
                userErrors: errorsRes
            }
        }

        return {
            project: obtainedData.project,
            userErrors: []
        };
    } catch (e) {
        let message;
        if (e instanceof Error) {
            message = e.message;
        }
        return {
            project: null,
            userErrors: [{message}]
        };
    }
}