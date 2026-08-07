import type { ApiRoute } from './types.js';

export const apiRoutes = {

    //authentication
    login: { path: '/users/login', method: 'POST' } as ApiRoute,
    register: { path: '/users/register', method: 'POST' } as ApiRoute,
    logout: { path: '/users/logout', method: 'POST' } as ApiRoute,
    getProfile: { path: '/users/profile', method: 'GET' } as ApiRoute,
    refreshToken: { path: '/users/refresh', method: 'POST' } as ApiRoute,

    //admin
    getAllUsers: { path: '/users', method: 'GET' } as ApiRoute,
    deleteUser: { path: 'users/:id', method: 'DELETE' } as ApiRoute,


    //ideas
    getIdeas: { path: '/ideas', method: 'GET' } as ApiRoute,
    getIdeaById: { path: '/ideas/:id', method: 'GET' } as ApiRoute,
    createIdea: { path: '/ideas', method: 'POST' } as ApiRoute,
    updateIdea: { path: '/ideas/:id', method: 'PUT' } as ApiRoute,
    deleteIdea: { path: '/ideas/:id', method: 'DELETE' } as ApiRoute,
};