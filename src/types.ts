export type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
  Home: undefined;
  Loading: undefined;
  Chat: {
    userIds: string[];
    other: User;
  };
};

export interface User {
  //Firebase 의 Collection 으로 사용됨;
  userId: string;
  email: string;
  name: string;
  profileUrl?: string;
}

export enum Collections {
  USERS = 'users',
  CHATS = 'chats',
  MESSAGES = 'messages',
}

export interface Chat {
  //Firebase 의 Collection 으로 사용됨;
  id: string;
  userIds?: string[];
  users?: User[];
}

export interface Message {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
}

export interface FirestoreMessageData {
  //Subcollection 으로 만들 예정
  text: string;
  user: User;
  createdAt: Date;
}
