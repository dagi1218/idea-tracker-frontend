import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../store/utils/toolkit.js';
import type {
    DefaultLayoutState,
    User,
    LoginPayload,
    RegisterPayload,
} from './types.js';

export const initialState: DefaultLayoutState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

const slice = createSlice({
    name: 'defaultLayout',
    initialState,
    reducers: {
        authenticateUser(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginRequest(state, _action: PayloadAction<LoginPayload>) {
            state.isLoading = true;
            state.error = null;
        },
        registerRequest(state, _action: PayloadAction<RegisterPayload>) {
            state.isLoading = true;
            state.error = null;
        },
        logoutRequest(state) {
            state.isLoading = true;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { actions: defaultLayoutActions, reducer: defaultLayoutReducer } = slice;
export default defaultLayoutReducer;