export interface IPosts {
  id: string;
  datePosted: string;
  user: {
    username: string;
    img: string;
  };
  message?: string;
  postImg?: string;
  video?: string;
  likes: number;
  comments: IComment[] | [];
}

export interface IComment {
  user: {
    username: string;
    img: string;
  };
  datePosted: string;
  comment: string;
  likes: number;
}
