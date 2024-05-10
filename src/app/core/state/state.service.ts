/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/user.model';
import { jwtDecode } from 'jwt-decode';
import { RepoService } from '../repo/repo.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Item } from '../entities/item.model';

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = JwtPayload & {
  id: string;
  role: string;
};

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: User | null;
  item: Item[] | null;
};
export const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
  item: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private server = inject(RepoService);
  private state$ = new BehaviorSubject<State>(initialState);
  jwt = jwtDecode;

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getToken = (): string | null => this.state$.value.token;

  loadItems() {
    this.server.getItems().subscribe((data) => {
      const currentState = this.state$.getValue();
      const updatedState: State = {
        ...currentState,
        item: data,
      };
      this.state$.next(updatedState);
    });
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currenPayload: Payload = this.jwt(token);
    console.log(currenPayload);
    localStorage.setItem('enDosRoueda', JSON.stringify({ token }));
    this.server.getById(currenPayload.id).subscribe((data) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: data,
      });
    });
  }
  setLogout() {
    localStorage.removeItem('enDosRoueda');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
  }
}
