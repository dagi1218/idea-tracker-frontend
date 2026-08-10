import { lazyLoad } from '../../../utils/loadable.js';

export const LoginPage = lazyLoad(
    () => import('./index.js'),
    (module) => module.LoginPage
);