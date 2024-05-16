import { ComponentFixture, TestBed } from '@angular/core/testing';
import ItemComponent from './item.component';
import { Payload, State, StateService } from '../../core/state/state.service';
import { of } from 'rxjs';
import { User } from '../../core/entities/user.model';
import { Item } from '../../core/entities/item.model';

const state: State = {
  loginState: 'logged',
  token: 'myToken',
  currenPayload: {} as Payload,
  currenUser: {} as User,
  item: [] as Item[],
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let service: StateService;
  const mockStateService = jasmine.createSpyObj('StateService', {
    loadItems: of([] as unknown as Item[]),
    getState: of(state),
    getCurrentUser: () => state.currenUser,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [{ provide: StateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    fixture.detectChanges();
  });

  it('should load items from state on initialization', () => {
    expect(service.loadItems).toHaveBeenCalled();
    expect(component.item).toEqual([] as Item[]);
  });
  it('should filter items by category', () => {
    const input = document.createElement('input');
    input.value = 'category';
    component.item = [{ category: 'category' } as unknown as Item];
    component.filterBy(input);
    expect(component.item).toEqual([
      { category: 'category' },
    ] as unknown as Item[]);
  });
  it('should search items by title', () => {
    const input = document.createElement('input');
    input.value = 'title';
    component.item = [{ title: 'title' } as unknown as Item];
    component.search(input);
    expect(component.item).toEqual([{ title: 'title' }] as unknown as Item[]);
  });
  it('should sort items by price in descending order', () => {
    component.item = [
      { price: 10 } as unknown as Item,
      { price: 20 } as unknown as Item,
    ];
    component.sortPriceDesc();
    expect(component.item).toEqual([
      { price: 10 } as unknown as Item,
      { price: 20 } as unknown as Item,
    ]);
  });
  it('should sort items by price in ascending order', () => {
    component.item = [
      { price: 10 } as unknown as Item,
      { price: 20 } as unknown as Item,
    ];
    component.sortPriceAsc();
    expect(component.item).toEqual([
      { price: 20 } as unknown as Item,
      { price: 10 } as unknown as Item,
    ]);
  });
});
