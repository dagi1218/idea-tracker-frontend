import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    selectIsAuthenticated,
    selectUser,
    selectIsLoading,
} from '../../app/layouts/DefaultLayout/slice/selectors.js';

import { ROUTE_PATHS } from '../constants.js';
import { Box, Flex } from '../../app/components/Blocks/index.js';

interface GuardProps {
    children: React.ReactNode;
}


export const ProtectedRoute: React.FC<GuardProps> = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectIsLoading);
    const location = useLocation();
    if (isLoading) {
        return (
            <Flex sx={{ height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ fontSize: 2, fontWeight: 'bold', color: 'primary' }}>
                    Verifying authentication status...
                </Box>
            </Flex>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
    }
    return <>{children}</>;

};


export const AdminRoute: React.FC<GuardProps> = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);
    const location = useLocation();

    if (isLoading) {
        return (
            <Flex sx={{ height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ fontSize: 2, fontWeight: 'bold', color: 'primary' }}>
                    Verifying authorization privileges...
                </Box>
            </Flex>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to={ROUTE_PATHS.HOME} replace />;
    }

    return <>{children}</>;
};