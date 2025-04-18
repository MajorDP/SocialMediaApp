export interface IMessage {
  sentBy: {
    id: string;
    username: string;
    img: string;
  };
  message?: string | null;
  img?: string | null;
  dateSent: string;
}

export interface IChat {
  participants: string[];
  messages: IMessage[];
  lastMessageDate: string;
  seen: boolean;
}
