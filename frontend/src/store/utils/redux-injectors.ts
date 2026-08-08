import {
    useInjectReducer as useReducerInjector,
    useInjectSaga as useSagaInjector,
} from 'redux-injectors';
import type { SagaInjectionModes } from 'redux-injectors';
import type { Reducer } from '@reduxjs/toolkit';
import type { Saga } from 'redux-saga';
import type { RootState } from '../types/RootState.js';

export type RootStateKeyType = keyof RootState;

export interface InjectReducerParams<Key extends RootStateKeyType> {
    key: Key;
    reducer: Reducer<NonNullable<RootState[Key]>>;
}

export interface InjectSagaParams {
    key: RootStateKeyType | string;
    saga: Saga;
    mode?: SagaInjectionModes;
}

export const useInjectReducer = <Key extends RootStateKeyType>(
    params: InjectReducerParams<Key>,
) => {
    return useReducerInjector(params as any);
};

export const useInjectSaga = (params: InjectSagaParams) => {
    return useSagaInjector(params as any);
};