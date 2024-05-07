/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Payload, StateService } from './state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { RepoService } from '../repo/repo.service';
import { jwtDecode } from 'jwt-decode';

describe('StateService', () => {
  let service: StateService;
  let mockServerService: jasmine.SpyObj<RepoService>;

  beforeEach(() => {
    mockServerService = jasmine.createSpyObj('ServerService', ['getById']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StateService,
        { provide: RepoService, useValue: mockServerService },
      ],
    });
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return state observable with getState', () => {
    const state = service.getState();
    expect(state).toBeInstanceOf(Observable);
  });
  it('should return token if available with getToken', () => {
    const token = 'myToken';
    service.state$.next({ ...service.state$.value, token });
    expect(service.getToken()).toEqual(token);
  });

  it('should setLoginState', () => {
    const loginState = 'logged';
    service.setLoginState(loginState);
    service.getState().subscribe((state) => {
      expect(state.loginState).toEqual(loginState);
    });
  });
  it('should setlogin', fakeAsync(() => {
    /*    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnVzbG1tbDAwMDBvaHpsMWE4dGJuOXEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcxNDk4OTc3NX0.arK_3EXtcYJfe3J9FZB-haFjnsRm3yloBYMq0tTzkkM';
 */
    const token = 'my token';
    const user = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      birthday: '11/01/1986',
      avatar: null,
      role: 'USER' as 'USER' | 'ADMIN' | 'CLUB',
    };
    const payload: Payload = {
      id: user.id,
      role: user.role,
      iat: 1234567890,
    };

    spyOn(localStorage, 'setItem').and.stub();
    spyOn(service, 'jwt').and.returnValue(payload);

    mockServerService.getById.and.returnValue(of(user));

    service.setLogin(token);
    tick();

    expect(service.state$.value.loginState).toEqual('logged');
    expect(service.state$.value.token).toEqual(token);
    expect(service.state$.value.currenPayload).toEqual(payload);
    expect(service.state$.value.currenUser).toEqual(user);
  }));
});
