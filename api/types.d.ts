export interface INewsMutation {
    title: string;
    description: string;
    image?: string | null;
}
export interface INews extends INewsMutation {
    id: number;
    created_at: string;
}

export interface ICommentMutation {
    news_id: number;
    author?: string;
    text: string;
}

export interface IComment extends ICommentMutation {
    id: number;
}