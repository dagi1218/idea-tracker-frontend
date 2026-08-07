import axios, { AxiosError } from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '../../utils/constants.js';
import { APIError } from './APIError.js';
import { ErrorCodes } from './ErrorCodes';

import type { MakeCallConfig } from './types.js';
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const makeCall = async <TResponse = unknown, TData = unknown, TParams = unknown>(
    config: MakeCallConfig<TData, TParams>): Promise<TResponse> => {

    const { route, data, params, pathParams, headers = {} } = config;

    let url = route.path;
    if (pathParams) {
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(`:${key}`, String(value));
        });
    }


    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,

    };

    if (token) {
        requestHeaders['Authorization'] = 'Bearer ' + token;
    }

    try {
        const response = await axiosInstance.request<TResponse>({
            url: url,
            method: route.method,
            data: data,
            params: params,
            headers: requestHeaders,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string; errors?: unknown }>;
            const status = axiosError.response?.status;
            const responseData = axiosError.response?.data;
            const message = responseData?.message || axiosError.message || 'An error occured';

            let code = null;

            if (!axiosError.response) {
                code = ErrorCodes.NETWORK_ERROR;
            } else if (status === 401) {
                code = ErrorCodes.UNAUTHORIZED;
            } else if (status === 403) {
                code = ErrorCodes.FORBIDDEN;
            } else if (status === 404) {
                code = ErrorCodes.NOT_FOUND;
            } else if (status === 400) {
                code = ErrorCodes.VALIDATION_ERROR;
            } else if (status && status >= 500) {
                code = ErrorCodes.SERVER_ERROR;
            } else {
                code = ErrorCodes.UNKNOWN_ERROR;
            }

            throw new APIError({
                message,
                code,
                status,
                data: responseData,
            });

        }
        throw new APIError({
            message: error instanceof Error ? error.message : 'Unknown error',
            code: ErrorCodes.UNKNOWN_ERROR,
        });
    }


}