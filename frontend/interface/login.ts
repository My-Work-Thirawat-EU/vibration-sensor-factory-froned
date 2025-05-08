import { User } from './user';

export interface LoginResponse {
  user: User;
  token: string;
  refresh_token: string;
  token_expiry: string;
}