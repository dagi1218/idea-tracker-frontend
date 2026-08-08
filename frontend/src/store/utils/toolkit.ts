import {
    createSlice as createSliceRTK,
    type CreateSliceOptions,
    type SliceCaseReducers,
} from '@reduxjs/toolkit';
import type { RootState } from '../types/RootState.js';

export const createSlice = <
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends keyof RootState & string
>(
    options: CreateSliceOptions<State, CaseReducers, Name>
) => {
    return createSliceRTK(options);
};