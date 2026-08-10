import { call, put, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { adminDashboardActions as actions } from './index.js';
import { makeCall, apiRoutes, APIError } from '../../../API/index.js';
import { type AdminUser } from './types.js';
import { type IIdeaModel } from '../../../models/idea.js';

interface UsersFetchResponse {
    count: number;
    users: AdminUser[];
}

interface IdeasFetchResponse {
    count: number;
    ideas: IIdeaModel[];
}

export function* handleFetchUsers() {
    try {
        const response: UsersFetchResponse = yield call(makeCall, {
            route: apiRoutes.getAllUsers,
        });
        yield put(actions.setUsers(response.users));
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to fetch users'));
    }
}

export function* handleDeleteUser(action: PayloadAction<string>) {
    try {
        yield call(makeCall, {
            route: apiRoutes.deleteUser,
            pathParams: { id: action.payload },
        });
        yield put(actions.fetchUsersRequest());
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to delete user'));
    }
}

export function* handleFetchIdeas() {
    try {
        const response: IdeasFetchResponse = yield call(makeCall, {
            route: apiRoutes.getIdeas,
        });
        yield put(actions.setIdeas(response.ideas));
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to fetch global ideas'));
    }
}

export function* handleDeleteIdea(action: PayloadAction<string>) {
    try {
        yield call(makeCall, {
            route: apiRoutes.deleteIdea,
            pathParams: { id: action.payload },
        });
        yield put(actions.fetchIdeasRequest());
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to delete idea'));
    }
}

export function* adminDashboardSaga() {
    yield takeLatest(actions.fetchUsersRequest.type, handleFetchUsers);
    yield takeLatest(actions.deleteUserRequest.type, handleDeleteUser);
    yield takeLatest(actions.fetchIdeasRequest.type, handleFetchIdeas);
    yield takeLatest(actions.deleteIdeaRequest.type, handleDeleteIdea);
}