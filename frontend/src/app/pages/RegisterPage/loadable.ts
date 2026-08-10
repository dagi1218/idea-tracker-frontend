import { lazyLoad } from '../../../utils/loadable.js';

export const RegisterPage = lazyLoad(
    () => import('./index.js'),
    (module) => module.RegisterPage
);