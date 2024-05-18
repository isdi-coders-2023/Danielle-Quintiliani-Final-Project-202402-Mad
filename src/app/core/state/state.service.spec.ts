import { TestBed } from '@angular/core/testing';
import { State, StateService, initialState } from './state.service';
import { RepoService } from '../repo/repo.service';
import { Subscription, of } from 'rxjs';
import { Item } from '../entities/item.model';
import { User } from '../entities/user.model';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

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
      getSingleItem: of({} as Item),
      addToFavorites: of({ id: '1', favorite: [] } as unknown as User),
      filterItems: of([] as Item[]),
    });
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter(routes),
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
  it('should get token', () => {
    // service.state$ = of({});
    const token = service.getToken();
    expect(token).toBeNull();
  });
  it('should set logout state', () => {
    service.setLogout();
    expect(state.loginState).toEqual('idle');
    expect(state.token).toEqual(null);
  });
  it('should add favorite item', () => {
    const itemId = 'item1';
    const currentUser = { id: 'user1', favorites: [] } as unknown as User;
    const updatedUser = { id: 'user1', favorites: [itemId] } as unknown as User;
    spyOn(service, 'getCurrentUser').and.returnValue(currentUser);
    mockServerService.addToFavorites.and.returnValue(of(updatedUser));

    service.addFavorite(itemId);

    expect(service.getCurrentUser).toHaveBeenCalled();
    expect(repoService.addToFavorites).toHaveBeenCalledWith(
      currentUser.id,
      itemId,
    );
    expect(service.state$.value.currenUser).toEqual(updatedUser);
  });
  it('should filter items by category', () => {
    const category = 'MOTO';
    const currentState = {
      ...initialState,
      item: [
        { id: 'item1', category },
        { id: 'item2', category: 'MOTO' },
      ] as unknown as Item[],
    };
    const updatedState = {
      ...currentState,
      item: [{ id: 'item1', category }] as unknown as Item[],
    };
    service.state$.next(currentState);
    mockServerService.filterItems.and.returnValue(of(updatedState.item));

    service.filterCategory(category);

    expect(repoService.filterItems).toHaveBeenCalledWith(category);
    expect(service.state$.value).toEqual(updatedState);
  });
  it('should get an item by id', () => {
    const id = 'item1';
    const item = { id: 'item1', name: 'Test Item' } as unknown as Item;
    mockServerService.getSingleItem.and.returnValue(of(item));

    service.getItem(id);

    expect(repoService.getSingleItem).toHaveBeenCalledWith(id);
    expect([item]).toEqual([item]);
  });
  afterEach(() => {
    suscription.unsubscribe();
  });
});
