export interface INewsMutation {
    title: string;
    description: string;
    image?: string | null;
}
export interface INews extends INews {
    id: number;
    created_at: string;
}

