import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, Flex, Button, Input, Icons } from '../../components/Blocks/index.js';
import { defaultLayoutActions } from '../../layouts/DefaultLayout/slice/index.js';
import {
    selectIsAuthenticated,
    selectError,
    selectIsLoading,
} from '../../layouts/DefaultLayout/slice/selectors.js';
import { loginSchema, validateWithZod, type LoginFormData } from '../../../utils/validation.js';
import { ROUTE_PATHS } from '../../../utils/constants.js';

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTE_PATHS.DASHBOARD;

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    useEffect(() => {
        return () => {
            dispatch(defaultLayoutActions.clearError());
        };
    }, [dispatch]);

    const formik = useFormik<LoginFormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateWithZod(loginSchema),
        onSubmit: (values) => {
            dispatch(defaultLayoutActions.loginRequest(values));
        },
    });

    return (
        <Box sx={{ maxWidth: '420px', mx: 'auto', mt: 4 }}>
            <Box
                sx={{
                    bg: 'white',
                    p: 4,
                    borderRadius: 'medium',
                    boxShadow: 'medium',
                    border: '1px solid',
                    borderColor: 'border',
                }}
            >
                <Flex sx={{ alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
                    <Icons.Idea sx={{ color: 'primary', fontSize: 36 }} />
                    <Box as="h2" sx={{ fontSize: 4, m: 0, color: 'text' }}>
                        Welcome Back
                    </Box>
                </Flex>

                {error && (
                    <Box
                        sx={{
                            bg: 'rgba(229, 62, 62, 0.1)',
                            color: 'danger',
                            p: 3,
                            borderRadius: 'small',
                            mb: 3,
                            fontSize: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        {error}
                    </Box>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isLoading}
                        sx={{ mt: 2, py: 2, fontSize: 2 }}
                    >
                        Log In
                    </Button>
                </form>

                <Flex sx={{ justifyContent: 'center', mt: 3, fontSize: 1, color: 'secondary' }}>
                    Don't have an account?{' '}
                    <Link to={ROUTE_PATHS.REGISTER} style={{ marginLeft: '4px', color: '#3182ce', fontWeight: 'bold' }}>
                        Sign Up
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
};

export default LoginPage;