import { call, put, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { userDashboardActions as actions } from './index.js';
import { makeCall, apiRoutes, APIError } from '../../../API/index.js';
import { type CreateIdeaPayload, type UpdateIdeaPayload } from './types.js';
import { type IIdeaModel } from '../../../models/idea.js';

interface IdeasFetchResponse {
    count: number;
    ideas: IIdeaModel[];
}

export function* handleFetchIdeas() {
    try {
        const response: IdeasFetchResponse = yield call(makeCall, {
            route: apiRoutes.getIdeas,
        });
        yield put(actions.setIdeas(response.ideas));
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to fetch ideas'));
    }
}

export function* handleCreateIdea(action: PayloadAction<CreateIdeaPayload>) {
    try {
        yield call(makeCall, {
            route: apiRoutes.createIdea,
            data: action.payload,
        });
        yield put(actions.closeModal());
        yield put(actions.fetchIdeasRequest());
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to create idea'));
    } finally {
        yield put(actions.setIsSubmitting(false));
    }
}

export function* handleUpdateIdea(action: PayloadAction<UpdateIdeaPayload>) {
    try {
        const { id, ...data } = action.payload;
        yield call(makeCall, {
            route: apiRoutes.updateIdea,
            pathParams: { id },
            data,
        });
        yield put(actions.closeModal());
        yield put(actions.fetchIdeasRequest());
    } catch (error) {
        const apiError = error as APIError;
        yield put(actions.setError(apiError.message || 'Failed to update idea'));
    } finally {
        yield put(actions.setIsSubmitting(false));
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

export function* userDashboardSaga() {
    yield takeLatest(actions.fetchIdeasRequest.type, handleFetchIdeas);
    yield takeLatest(actions.createIdeaRequest.type, handleCreateIdea);
    yield takeLatest(actions.updateIdeaRequest.type, handleUpdateIdea);
    yield takeLatest(actions.deleteIdeaRequest.type, handleDeleteIdea);
}