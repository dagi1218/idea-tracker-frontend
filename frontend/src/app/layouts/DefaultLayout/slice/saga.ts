import { call, put, takeLatest } from 'redux-saga/effects';
import { defaultLayoutActions as actions } from './index.js';
import { makeCall, apiRoutes, APIError } from '../../../API/index.js';
import { AUTH_TOKEN_KEY } from '../../../../utils/constants.js';
import type { LoginPayload, RegisterPayload, User } from './types.js';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthResponse {
    user: {
        _id?: string;
        id?: string;
        name: string;
        email: string;
        role: 'user' | 'admin';
    };
    token?: string;
}

export function* handleAuthenticateUser() {
    try {
        const response: AuthResponse = yield call(makeCall, {
            route: apiRoutes.getProfile,
        });

        const user: User = {
            id: response.user._id || response.user.id || '',
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
        };

        yield put(actions.setUser(user));
    } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        yield put(actions.setUser(null));
    }
}

export function* handleLogin(action: PayloadAction<LoginPayload>) {
    try {
        const response: AuthResponse = yield call(makeCall, {
            route: apiRoutes.login,
            data: action.payload,
        });

        if (response.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        }

        const user: User = {
            id: response.user._id || response.user.id || '',
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
        };

        yield put(actions.setUser(user));
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Login failed'));
    }
}

export function* handleRegister(action: PayloadAction<RegisterPayload>) {
    try {
        const response: AuthResponse = yield call(makeCall, {
            route: apiRoutes.register,
            data: action.payload,
        });

        if (response.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        }

        const user: User = {
            id: response.user._id || response.user.id || '',
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
        };

        yield put(actions.setUser(user));
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Registration failed'));
    }
}

export function* handleLogout() {
    try {
        yield call(makeCall, { route: apiRoutes.logout });
    } catch (_err) {
        // Ignore network logout errors
    } finally {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        yield put(actions.setUser(null));
    }
}

export function* defaultLayoutSaga() {
    yield takeLatest(actions.authenticateUser.type, handleAuthenticateUser);
    yield takeLatest(actions.loginRequest.type, handleLogin);
    yield takeLatest(actions.registerRequest.type, handleRegister);
    yield takeLatest(actions.logoutRequest.type, handleLogout);
}