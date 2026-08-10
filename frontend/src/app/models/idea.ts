export interface IIdeaOwner {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    role?: string;
}

export interface IIdeaModel {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    tags?: string[];
    owner?: IIdeaOwner | string;
    createdAt?: string;
    updatedAt?: string;
}