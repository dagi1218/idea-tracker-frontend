import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Icons } from '../../components/Blocks/index.js';
import { selectUser, selectIsAuthenticated } from '../../layouts/DefaultLayout/slice/selectors.js';
import { ROUTE_PATHS } from '../../../utils/constants.js';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <Box sx={{ py: 5, textAlign: 'center' }}>
            <Flex sx={{ justifyContent: 'center', mb: 3 }}>
                <Icons.Idea sx={{ fontSize: 64, color: 'primary' }} />
            </Flex>
            <Box as="h1" sx={{ fontSize: 5, mb: 2, color: 'text' }}>
                Capture, Organize, and Scale Your Product Ideas
            </Box>
            <Box sx={{ fontSize: 3, color: 'secondary', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                A modern full-stack idea tracking platform powered by React, Redux Toolkit, Redux Saga, and Express.
            </Box>

            {isAuthenticated ? (
                <Box sx={{ bg: 'white', p: 4, borderRadius: 'medium', boxShadow: 'medium', maxWidth: '500px', mx: 'auto' }}>
                    <Box sx={{ fontSize: 2, mb: 3 }}>
                        Welcome back, <strong>{user?.name}</strong>!
                    </Box>
                    <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.DASHBOARD)} sx={{ py: 2, px: 4 }}>
                        Go to Your Ideas Dashboard
                    </Button>
                </Box>
            ) : (
                <Flex sx={{ justifyContent: 'center', gap: 3 }}>
                    <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.REGISTER)} sx={{ py: 2, px: 4, fontSize: 2 }}>
                        Get Started (Sign Up)
                    </Button>
                    <Button variant="outline" onClick={() => navigate(ROUTE_PATHS.LOGIN)} sx={{ py: 2, px: 4, fontSize: 2 }}>
                        Log In
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default HomePage;