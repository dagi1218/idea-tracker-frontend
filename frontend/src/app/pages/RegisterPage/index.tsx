import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Flex, Button, Input, Icons } from '../../components/Blocks/index.js';
import { defaultLayoutActions } from '../../layouts/DefaultLayout/slice/index.js';
import {
    selectIsAuthenticated,
    selectError,
    selectIsLoading,
} from '../../layouts/DefaultLayout/slice/selectors.js';
import { registerSchema, validateWithZod, type RegisterFormData } from '../../../utils/validation.js';
import { ROUTE_PATHS } from '../../../utils/constants.js';

export const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            dispatch(defaultLayoutActions.clearError());
        };
    }, [dispatch]);

    const formik = useFormik<RegisterFormData>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
        },
        validate: validateWithZod(registerSchema),
        onSubmit: (values) => {
            dispatch(defaultLayoutActions.registerRequest(values));
        },
    });

    return (
        <Box sx={{ maxWidth: '460px', mx: 'auto', mt: 4 }}>
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
                        Create an Account
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
                        id="name"
                        name="name"
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    />

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="john@example.com"
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
                        placeholder="At least 8 characters"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                    />

                    <Box sx={{ mb: 3 }}>
                        <Box as="label" sx={{ display: 'block', mb: 1, fontWeight: 'bold', fontSize: 1 }}>
                            Account Role
                        </Box>
                        <select
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e0',
                                backgroundColor: 'white',
                                fontSize: '14px',
                            }}
                        >
                            <option value="user">Standard User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </Box>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isLoading}
                        sx={{ mt: 2, py: 2, fontSize: 2 }}
                    >
                        Create Account
                    </Button>
                </form>

                <Flex sx={{ justifyContent: 'center', mt: 3, fontSize: 1, color: 'secondary' }}>
                    Already have an account?{' '}
                    <Link to={ROUTE_PATHS.LOGIN} style={{ marginLeft: '4px', color: '#3182ce', fontWeight: 'bold' }}>
                        Log In
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
};

export default RegisterPage;