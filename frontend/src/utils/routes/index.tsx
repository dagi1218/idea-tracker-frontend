import type { IRoute } from './types.js';
import { ROUTE_PATHS } from '../constants.js';
import { HomePage } from '../../app/pages/HomePage/loadable.js';

export const routes: IRoute[] = [
    {
        path: ROUTE_PATHS.HOME,
        element: <HomePage />,
        isProtected: false,
    },
];

export * from './types.js';
export * from './guards.js';