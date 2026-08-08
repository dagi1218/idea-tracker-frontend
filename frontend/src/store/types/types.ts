import type { Reducer } from "@reduxjs/toolkit";
export type Saga = (...args: any[]) => any;

export interface InjectedReducersType {
    [key: string]: Reducer;
}

