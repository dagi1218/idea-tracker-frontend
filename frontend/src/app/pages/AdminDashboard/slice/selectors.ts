import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store/types/RootState.js';
import { initialState } from './index.js';

const selectDomain = (state: RootState) => state.adminDashboard || initialState;

export const selectAdminUsers = createSelector(
    [selectDomain],
    (state) => state.users
);

export const selectAdminIdeas = createSelector(
    [selectDomain],
    (state) => state.ideas
);

export const selectIsLoadingUsers = createSelector(
    [selectDomain],
    (state) => state.isLoadingUsers
);

export const selectIsLoadingIdeas = createSelector(
    [selectDomain],
    (state) => state.isLoadingIdeas
);

export const selectAdminError = createSelector(
    [selectDomain],
    (state) => state.error
);

export const selectActiveTab = createSelector(
    [selectDomain],
    (state) => state.activeTab
);