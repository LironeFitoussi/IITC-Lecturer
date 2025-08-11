// Shared chat types for UI scaffolding and future Socket.IO contracts

export type User = {
  id: string;
  username: string;
};

export type PublicMessage = {
  id: string;
  text: string;
  userId: string;
  username: string;
  timestamp: string; // ISO string
};

export type PrivateMessage = {
  id: string;
  text: string;
  fromUserId: string;
  toUserId: string;
  username: string; // sender username
  timestamp: string; // ISO string
};

export type UiMessage =
  | (PublicMessage & { isPrivate?: false })
  | (PrivateMessage & { isPrivate: true });

export type ServerError = {
  code: string;
  message: string;
};


