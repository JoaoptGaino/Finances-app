export interface IAuthenticatedUser {
  id: string;
  email: string;
  username: string;
}
export interface IUserSession {
  email: string;
  userId: string;
}

export interface IPayloadJWT {
  sub: string;
  email: string;
}
