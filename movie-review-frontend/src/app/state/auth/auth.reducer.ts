import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface IUser {
  isAdmin: boolean;
  sub: string;
  username: string;
}
export interface AuthState {
  token: string | null;
  user: IUser | null;
}

export const initialState: AuthState = {
  token: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, user }) => ({ ...state, token, user })),
  on(logout, (state) => ({ ...state, token: null }))
);
