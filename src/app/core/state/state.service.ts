/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, signal } from '@angular/core';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/user.model';
type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: User | null;
};
const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _userState = signal(initialState);
  public userState = this._userState.asReadonly();


/*   getToken() {}

  setloginState() {}

  setLogin() {}

  setlogout() {} */
}
