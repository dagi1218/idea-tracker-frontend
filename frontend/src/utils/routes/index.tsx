import type { IRoute } from './types.js';
import { ROUTE_PATHS } from '../constants.js';
import { HomePage } from '../../app/pages/HomePage/loadable.js';
import { LoginPage } from '../../app/pages/LoginPage/loadable.js';
import { RegisterPage } from '../../app/pages/RegisterPage/loadable.js';

export const routes: IRoute[] = [
    {
        path: ROUTE_PATHS.HOME,
        element: <HomePage />,
        isProtected: false,
    },
    {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginPage />,
        isProtected: false,
    },
    {
        path: ROUTE_PATHS.REGISTER,
        element: <RegisterPage />,
        isProtected: false,
    },
];

export * from './types.js';
export * from './guards.js';