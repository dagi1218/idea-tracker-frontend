import { lazyLoad } from '../../../utils/loadable.js';

export const DefaultLayout = lazyLoad(
    () => import('./index.js'),
    (module) => module.DefaultLayout
);