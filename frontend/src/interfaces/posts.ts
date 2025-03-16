export interface IPosts {
  id: string;
  datePosted: string;
  user: {
    username: string;
    img: string;
    id: string;
  };
  message?: string;
  postImg?: string;
  video?: string;
  isEdited: boolean;
  categories: string[];
  likes: number;
  comments: IComment[] | [];
}

export interface IComment {
  user: {
    username: string;
    img: string;
    id: string;
  };
  datePosted: string;
  comment: string;
  likes: number;
}
