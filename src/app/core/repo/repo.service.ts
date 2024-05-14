import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment.development';
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

  createUser(data: FormData) {
    return this.httpClient.post(this.url + '/user/register', data);
  }

  createItem(data: FormData) {
    return this.httpClient.post(this.url + '/item', data);
  }
}
