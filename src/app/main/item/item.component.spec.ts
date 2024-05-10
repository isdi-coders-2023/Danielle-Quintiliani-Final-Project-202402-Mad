import { ComponentFixture, TestBed } from '@angular/core/testing';

import ItemComponent from './item.component';
import { Payload, State, StateService } from '../../core/state/state.service';
import { of } from 'rxjs';
import { Item } from '../../core/entities/item.model';
import { User } from '../../core/entities/user.model';

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
  const mockStateService = jasmine.createSpyObj(StateService, {
    loadItems: of([] as unknown as Item[]),
    getState: of(state),
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
    /*  const items: Item[] = [
      {
        id: 'string',
        title: 'string',
        content: 'string',
        price: 'string',
        ownerItemId: 'string',
        image: [],
        createdAt: 'string',
        owner: 'carlos' as unknown as User,
      },
    ]; */

    expect(service.loadItems).toHaveBeenCalled();
    expect(component.item).toEqual([] as Item[]);
  });
});
