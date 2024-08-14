import { createAction, props } from '@ngrx/store';
import { IUser } from './auth.reducer';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: IUser }>()
);

export const logout = createAction('[Auth] Logout');
