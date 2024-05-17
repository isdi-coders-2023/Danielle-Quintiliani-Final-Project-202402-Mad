import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RepoService } from './repo.service';
import { of } from 'rxjs';
import { User } from '../entities/user.model';
import { HttpClientModule } from '@angular/common/http';
const mockedUser = {
  id: '1',
  name: 'name',
  email: 'test@example.com',
  password: 'password',
  birthday: '',
  avatar: null,
  role: 'USER' as const,
};

describe('RepoService', () => {
  let service: RepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoService, HttpClientModule],
    });
    service = TestBed.inject(RepoService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const mockData = {
      name: 'test',
      password: 'password',
      email: 'test@example.com',
    };
    const mockResponse = { token: 'someToken' };
    const httpClientSpy = spyOn(service.httpClient, 'post').and.returnValue(
      of(mockResponse),
    );

    service.login(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy).toHaveBeenCalledWith(
      service.url + '/user/login',
      mockData,
    );
  });
  it('should get user list', () => {
    const mockUserList: User[] = [mockedUser];
    const httpClientSpy = spyOn(service.httpClient, 'get').and.returnValue(
      of(mockUserList),
    );

    service.getUser().subscribe((users) => {
      expect(users).toEqual(mockUserList);
    });

    expect(httpClientSpy).toHaveBeenCalledWith(service.url + '/user');
  });
  it('should get user by ID', () => {
    const userId = '1';
    const mockUser: User = mockedUser;
    const httpClientSpy = spyOn(service.httpClient, 'get').and.returnValue(
      of(mockUser),
    );

    service.getById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    expect(httpClientSpy).toHaveBeenCalledWith(
      service.url + '/user' + '/' + userId,
    );
  });

  it('should retrieve item by id', () => {
    const id = '123';
    const mockItem = { id: 'item1', name: 'Test Item' };
    service.getSingleItem(id).subscribe((item) => {
      expect(item).toEqual(mockItem);
    });
    const req = httpMock.expectOne('http://localhost:3400/item123');
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should create a new user', () => {
    const formData = new FormData();
    formData.append('username', 'testUser');
    formData.append('password', 'testPassword');

    service.createUser(formData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/user/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush({});
  });
  it('should filter items by category', () => {
    const category = 'test';
    const mockItems = [{ id: 'item1', name: 'Test Item' }];
    service.filterItems(category).subscribe((items) => {
      expect(items).toEqual(mockItems);
    });
    const req = httpMock.expectOne(
      service.url + '/item' + '/category/' + category,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });
  it('should add item to favorites', () => {
    const userId = '1';
    const itemId = 'item1';
    const mockUser = { id: '1', favorites: ['item1'] } as unknown as User;
    service.addToFavorites(userId, itemId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(
      service.url + '/user/' + userId + '/favorite/' + itemId,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
  it('should remove item from favorites', () => {
    const userId = '1';
    const itemId = 'item1';
    const mockUser = { id: '1', favorites: [] } as unknown as User;
    service.removeFromFavorites(userId, itemId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(
      service.url + '/user/' + userId + '/favorite/' + itemId,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockUser);
  });
  it('should create a new item', () => {
    const formData = new FormData();
    formData.append('name', 'testItem');
    formData.append('price', '100');

    service.createItem(formData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/item/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush({});
  });
});
