export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface DefaultLayoutState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}