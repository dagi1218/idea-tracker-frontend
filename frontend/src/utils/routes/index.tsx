import type { IRoute } from './types.js';
import { ROUTE_PATHS } from '../constants.js';
import { HomePage } from '../../app/pages/HomePage/loadable.js';
import { LoginPage } from '../../app/pages/LoginPage/loadable.js';
import { RegisterPage } from '../../app/pages/RegisterPage/loadable.js';
import { UserDashboard } from '../../app/pages/UserDashboard/loadable.js';
import { AdminDashboard } from '../../app/pages/AdminDashboard/loadable.js';

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
    {
        path: ROUTE_PATHS.DASHBOARD,
        element: <UserDashboard />,
        isProtected: true, // Guarded route requiring JWT authentication
    },
    {
        path: ROUTE_PATHS.ADMIN,
        element: <AdminDashboard />,
        isAdminOnly: true, // Strict Role-Based Route Guard for Admin role
    },
];

export * from './types.js';
export * from './guards.js';