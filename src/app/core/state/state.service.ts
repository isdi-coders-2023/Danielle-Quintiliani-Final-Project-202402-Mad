/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/user.model';
import { jwtDecode } from 'jwt-decode';
import { RepoService } from '../repo/repo.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Category, Item } from '../entities/item.model';
import { Router } from '@angular/router';

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
  public router = inject(Router);
  private server = inject(RepoService);
  public state$ = new BehaviorSubject<State>(initialState);
  jwt = jwtDecode;

  getState(): Observable<State> {
    return this.state$.asObservable();
  }
  //da provare!
  getItem(id: string) {
    if (id) {
      this.server.getSingleItem(id).subscribe((item) => {
        console.log('getItem:', item);
        return item;
      });
    }
  }

  addFavorite(itemId: string) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.server.addToFavorites(currentUser.id, itemId).subscribe((data) => {
        console.log('addFavorite:', data);
        this.state$.next({ ...this.state$.value, currenUser: data });
      });
    }
  }

  filterCategory(category: Category) {
    if (category) {
      this.server.filterItems(category).subscribe((data) => {
        console.log('filter:', data);
        const currentState = this.state$.getValue();
        const updatedState: State = {
          ...currentState,
          item: data as Item[],
        };
        this.state$.next(updatedState);
      });
    }
  }

  getCurrentUser = (): User => this.state$.value.currenUser!;

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
    console.log('State Service Payload', currenPayload);
    console.log('State Service Token', token);
    localStorage.setItem('enDosRueda', JSON.stringify({ token }));
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
    localStorage.removeItem('enDosRueda');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
    this.router.navigate(['/home']);
  }
}
