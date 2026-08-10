import React from 'react';

export interface IRoute {
    path: string;
    element: React.ReactNode;
    isProtected?: boolean;
    isAdminOnly?: boolean;
}