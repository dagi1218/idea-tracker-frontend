import type { Method } from 'axios';

export interface ApiRoute {
    path: string;
    method: Method;
}



export interface MakeCallConfig<TData = unknown, TParams = unknown> {
    route: ApiRoute;
    data?: TData;
    params?: TParams;
    pathParams?: Record<string, string | number>;
    headers?: Record<string, string>;
    withCredentials?: boolean;
}





