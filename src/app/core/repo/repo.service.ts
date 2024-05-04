import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { LoginUserDto, User } from '../entities/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/user';
  createUrl = environment.apiUrl + '/user/register';
  constructor() {}

  login(_data: LoginUserDto) {
    const data = {
      name: _data.name,
      password: _data.password,
      email: _data.email,
    };
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get(this.url) as Observable<User[]>;
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get(this.url + '/' + id) as Observable<User>;
  }
  getItem(userId: string) {
    const result = this.httpClient.get(this.url + userId + '/item');
    return result;
  }

  createUser(data: FormData) {
    return this.httpClient.post(this.createUrl, data);
  }
}
