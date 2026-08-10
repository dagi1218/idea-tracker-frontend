import { lazyLoad } from '../../../utils/loadable.js';

export const UserDashboard = lazyLoad(
    () => import('./index.js'),
    (module) => module.UserDashboard
);