import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../../../../store/types/RootState.js';
import { initialState } from './index.js';

const selectDomain = (state: RootState) => state.userDashboard || initialState;

export const selectIdeas = createSelector(
    [selectDomain],
    (state) => state.ideas
);

export const selectIsLoading = createSelector(
    [selectDomain],
    (state) => state.isLoading
);

export const selectIsSubmitting = createSelector(
    [selectDomain],
    (state) => state.isSubmitting
);

export const selectError = createSelector(
    [selectDomain],
    (state) => state.error
);

export const selectIsModalOpen = createSelector(
    [selectDomain],
    (state) => state.isModalOpen
);

export const selectSelectedIdea = createSelector(
    [selectDomain],
    (state) => state.selectedIdea
);