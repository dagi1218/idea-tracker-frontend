import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../store/utils/toolkit.js';
import type {
    UserDashboardState,
    CreateIdeaPayload,
    UpdateIdeaPayload,
} from './types.js';
import type { IIdeaModel } from '../../../models/idea.js';

export const initialState: UserDashboardState = {
    ideas: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    isModalOpen: false,
    selectedIdea: null,
};

const slice = createSlice({
    name: 'userDashboard',
    initialState,
    reducers: {
        fetchIdeasRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        setIdeas(state, action: PayloadAction<IIdeaModel[]>) {
            state.ideas = action.payload;
            state.isLoading = false;
        },
        createIdeaRequest(state, _action: PayloadAction<CreateIdeaPayload>) {
            state.isSubmitting = true;
            state.error = null;
        },
        updateIdeaRequest(state, _action: PayloadAction<UpdateIdeaPayload>) {
            state.isSubmitting = true;
            state.error = null;
        },
        deleteIdeaRequest(state, _action: PayloadAction<string>) {
            state.isLoading = true;
            state.error = null;
        },
        openModal(state, action: PayloadAction<IIdeaModel | null>) {
            state.isModalOpen = true;
            state.selectedIdea = action.payload;
            state.error = null;
        },
        closeModal(state) {
            state.isModalOpen = false;
            state.selectedIdea = null;
            state.error = null;
        },
        setIsSubmitting(state, action: PayloadAction<boolean>) {
            state.isSubmitting = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
            state.isSubmitting = false;
        },
    },
});

export const { actions: userDashboardActions, reducer: userDashboardReducer } = slice;
export default userDashboardReducer;