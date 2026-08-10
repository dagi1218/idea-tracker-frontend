import { type IIdeaModel } from '../../../models/idea.js';

export interface UserDashboardState {
    ideas: IIdeaModel[];
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    isModalOpen: boolean;
    selectedIdea: IIdeaModel | null;
}

export interface CreateIdeaPayload {
    title: string;
    description: string;
    tags?: string[];
}

export interface UpdateIdeaPayload {
    id: string;
    title?: string;
    description?: string;
    tags?: string[];
}