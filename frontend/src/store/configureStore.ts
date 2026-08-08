import { configureStore } from '@reduxjs/toolkit';
import type { StoreEnhancer } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { createReducer } from './reducers.js';

export function configureAppStore() {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ] as StoreEnhancer[];

    const store = configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(sagaMiddleware as any),
        devTools: import.meta.env.DEV,
        enhancers: (getDefaultEnhancers) =>
            getDefaultEnhancers().concat(enhancers as any),
    });

    return store;
}

export type AppStore = ReturnType<typeof configureAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

