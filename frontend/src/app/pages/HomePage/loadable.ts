import { lazyLoad } from '../../../utils/loadable.js';

export const HomePage = lazyLoad(
    () => import('./index.js'),
    (module) => module.HomePage
);