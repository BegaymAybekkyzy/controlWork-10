export interface INewsForm {
  title: string;
  description: string;
  image: File | null;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface ICommentForm {
  news_id: number;
  author?: string;
  text: string;
}

export interface IComment extends ICommentForm {
  id: number;
}
