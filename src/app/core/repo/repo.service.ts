import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LoginUserDto, User } from '../entities/user.model';
import { Observable } from 'rxjs';
import { Item } from '../entities/item.model';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  httpClient = inject(HttpClient);

  url = environment.apiUrl;

  login(_data: LoginUserDto) {
    const data = {
      name: _data.name,
      password: _data.password,
      email: _data.email,
    };
    return this.httpClient.post<{ token: string }>(
      this.url + '/user' + '/login',
      data,
    );
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get(this.url + '/user') as Observable<User[]>;
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get(
      this.url + '/user' + '/' + id,
    ) as Observable<User>;
  }
  getItems(): Observable<Item[]> {
    return this.httpClient.get(this.url + '/item') as Observable<Item[]>;
  }
  getSingleItem(id: string) {
    const result = this.httpClient.get(this.url + '/item' + id);
    return result;
  }
  filterItems(category: string) {
    return this.httpClient.get(this.url + '/item' + '/category/' + category);
  }
  addToFavorites(userId: string, itemId: string): Observable<User> {
    return this.httpClient.post<User>(
      this.url + '/user/' + userId + '/favorite/' + itemId,
      {},
    );
  }

  removeFromFavorites(userId: string, itemId: string): Observable<User> {
    return this.httpClient.delete<User>(
      this.url + '/user/' + userId + '/favorite/' + itemId,
    );
  }

  createUser(data: FormData) {
    return this.httpClient.post(this.url + '/user/register', data);
  }

  createItem(data: FormData) {
    return this.httpClient.post(this.url + '/item/add', data);
  }
}
