import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Flex, Button, Icons } from '../Blocks/index.js';
import type { DefaultLayoutProps } from './types.js';
import { ROUTE_PATHS } from '../../../utils/constants.js';

export const DefaultLayoutComponent: React.FC<DefaultLayoutProps> = ({
    children,
    user,
    isAuthenticated,
    onLogout,
}) => {
    const navigate = useNavigate();

    return (
        <Flex sx={{ flexDirection: 'column', minHeight: '100vh', bg: 'background' }}>
            {/* Top Navbar */}
            <Flex
                as="header"
                sx={{
                    height: '64px',
                    px: 4,
                    bg: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'border',
                    boxShadow: 'small',
                }}
            >
                <Flex sx={{ alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate(ROUTE_PATHS.HOME)}>
                    <Icons.Idea sx={{ color: 'primary', fontSize: 32 }} />
                    <Box sx={{ fontWeight: 'bold', fontSize: 3, color: 'text' }}>
                        IdeaTracker
                    </Box>
                </Flex>

                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                    {isAuthenticated && user ? (
                        <>
                            <Flex sx={{ alignItems: 'center', gap: 1, color: 'secondary', fontSize: 2 }}>
                                <Icons.User sx={{ fontSize: 20 }} />
                                <Box sx={{ fontWeight: 'bold' }}>{user.name}</Box>
                                <Box
                                    sx={{
                                        ml: 1,
                                        px: 2,
                                        py: '2px',
                                        fontSize: 0,
                                        borderRadius: 'small',
                                        bg: user.role === 'admin' ? 'accent' : 'muted',
                                        color: user.role === 'admin' ? 'white' : 'text',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {user.role}
                                </Box>
                            </Flex>

                            {user.role === 'admin' && (
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(ROUTE_PATHS.ADMIN)}
                                    sx={{ py: 1, px: 2, fontSize: 1 }}
                                >
                                    Admin Panel
                                </Button>
                            )}

                            <Button
                                variant="danger"
                                onClick={onLogout}
                                sx={{ py: 1, px: 2, fontSize: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Icons.Logout sx={{ fontSize: 16 }} />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to={ROUTE_PATHS.LOGIN} style={{ textDecoration: 'none' }}>
                                <Button variant="outline" sx={{ py: 1, px: 3, fontSize: 2 }}>
                                    Log In
                                </Button>
                            </Link>
                            <Link to={ROUTE_PATHS.REGISTER} style={{ textDecoration: 'none' }}>
                                <Button variant="primary" sx={{ py: 1, px: 3, fontSize: 2 }}>
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </Flex>
            </Flex>

            {/* Main Content Area */}
            <Box as="main" sx={{ flex: 1, p: 4, maxWidth: '1200px', width: '100%', mx: 'auto' }}>
                {children}
            </Box>

            {/* Footer */}
            <Flex
                as="footer"
                sx={{
                    py: 3,
                    px: 4,
                    bg: 'white',
                    borderTop: '1px solid',
                    borderColor: 'border',
                    justifyContent: 'center',
                    color: 'secondary',
                    fontSize: 1,
                }}
            >
                © {new Date().getFullYear()} IdeaTracker. Full-Stack Express + React Architecture.
            </Flex>
        </Flex>
    );
};

export * from './types.js';