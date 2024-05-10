/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { State, StateService, initialState } from './state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RepoService } from '../repo/repo.service';
import { Subscription, of } from 'rxjs';
import { Item } from '../entities/item.model';
import { User } from '../entities/user.model';

describe('StateService', () => {
  let service: StateService;
  let mockServerService: jasmine.SpyObj<RepoService>;
  let repoService: RepoService;
  let state: State;
  let suscription: Subscription;
  beforeEach(() => {
    mockServerService = jasmine.createSpyObj(RepoService, {
      getById: of({} as User),
      getItems: of([] as Item[]),
    });
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        StateService,
        { provide: RepoService, useValue: mockServerService },
      ],
    });
    service = TestBed.inject(StateService);
    repoService = TestBed.inject(RepoService);
    suscription = service.getState().subscribe((data) => {
      state = data;
    });
  });
  it('should be created and getState works', () => {
    expect(state).toEqual(initialState);
    expect(service).toBeTruthy();
  });
  it('should load items', () => {
    service.loadItems();
    expect(repoService.getItems).toHaveBeenCalled();
  });
  it('should set login state', () => {
    service.setLoginState('logged');
    expect(state.loginState).toEqual('logged');
  });
  it('should setLogin state', () => {
    const token = 'myToken';
    spyOn(service, 'jwt').and.returnValue({ id: 'string', role: 'string' });
    service.setLogin(token);

    expect(state.loginState).toEqual('logged');
    expect(state.token).toEqual(token);
  });
  it('should set logout state', () => {
    service.setLogout();
    expect(state.loginState).toEqual('idle');
    expect(state.token).toEqual(null);
  });
  afterEach(() => {
    suscription.unsubscribe();
  });
});
