import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store/types/RootState.js';
import { initialState } from './index.js';

const selectDomain = (state: RootState) => state.defaultLayout || initialState;

export const selectUser = createSelector(
    [selectDomain],
    (state) => state.user
);

export const selectIsAuthenticated = createSelector(
    [selectDomain],
    (state) => state.isAuthenticated
);

export const selectIsLoading = createSelector(
    [selectDomain],
    (state) => state.isLoading
);

export const selectError = createSelector(
    [selectDomain],
    (state) => state.error
);