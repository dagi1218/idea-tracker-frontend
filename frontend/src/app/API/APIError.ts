import { ErrorCodes } from './ErrorCodes/index.js';


export interface APIErrorDetails {
    code: ErrorCodes;
    message: string;
    status?: number;
    data?: unknown;
}


export class APIError extends Error {
    public readonly code: ErrorCodes;
    public readonly status?: number;
    public readonly data?: unknown;


    constructor({ message, code, status, data }: APIErrorDetails) {
        super(message);
        this.name = 'APIError';
        this.code = code;
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}