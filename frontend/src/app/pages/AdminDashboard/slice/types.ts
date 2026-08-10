import { type User } from '../../../layouts/DefaultLayout/slice/types.js';
import { type IIdeaModel } from '../../../models/idea.js';

export interface AdminUser extends User {
    createdAt?: string;
}

export interface AdminDashboardState {
    users: AdminUser[];
    ideas: IIdeaModel[];
    isLoadingUsers: boolean;
    isLoadingIdeas: boolean;
    error: string | null;
    activeTab: 'users' | 'ideas';
}