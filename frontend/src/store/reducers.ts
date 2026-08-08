import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';
import type { InjectedReducersType } from './types/types.js';

export function createReducer(
    injectedReducers: InjectedReducersType = {}

): Reducer {
    if (Object.keys(injectedReducers).length === 0) {
        return (state = {}) => state;

    }

    return combineReducers({
        ...injectedReducers,
    });

}