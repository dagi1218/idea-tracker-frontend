import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../../store/utils/toolkit.js';
import type { AdminDashboardState, AdminUser } from './types.js';
import type { IIdeaModel } from '../../../models/idea.js';

export const initialState: AdminDashboardState = {
    users: [],
    ideas: [],
    isLoadingUsers: false,
    isLoadingIdeas: false,
    error: null,
    activeTab: 'users',
};

const slice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        fetchUsersRequest(state) {
            state.isLoadingUsers = true;
            state.error = null;
        },
        setUsers(state, action: PayloadAction<AdminUser[]>) {
            state.users = action.payload;
            state.isLoadingUsers = false;
        },
        deleteUserRequest(state, _action: PayloadAction<string>) {
            state.isLoadingUsers = true;
            state.error = null;
        },
        fetchIdeasRequest(state) {
            state.isLoadingIdeas = true;
            state.error = null;
        },
        setIdeas(state, action: PayloadAction<IIdeaModel[]>) {
            state.ideas = action.payload;
            state.isLoadingIdeas = false;
        },
        deleteIdeaRequest(state, _action: PayloadAction<string>) {
            state.isLoadingIdeas = true;
            state.error = null;
        },
        setActiveTab(state, action: PayloadAction<'users' | 'ideas'>) {
            state.activeTab = action.payload;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoadingUsers = false;
            state.isLoadingIdeas = false;
        },
    },
});

export const { actions: adminDashboardActions, reducer: adminDashboardReducer } = slice;
export default adminDashboardReducer;