import { lazyLoad } from '../../../utils/loadable.js';

export const AdminDashboard = lazyLoad(
    () => import('./index.js'),
    (module) => module.AdminDashboard
);