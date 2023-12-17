export interface ChatApi {
  _id: string;
  author: string;
  datetime: string;
  message: string;
}

export interface ChatForm {
  author: string;
  message: string;
}