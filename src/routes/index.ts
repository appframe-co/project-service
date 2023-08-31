import { RoutesInput } from '@/types/types'
import project from './project.route'
import accessToken from './access-token.route'

export default ({ app }: RoutesInput) => {
    app.use('/api/access-token', accessToken);
    app.use('/api/projects', project);
};