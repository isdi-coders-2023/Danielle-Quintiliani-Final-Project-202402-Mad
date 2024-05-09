import { ComponentFixture, TestBed } from '@angular/core/testing';

import ItemComponent from './item.component';
import { LoginState, StateService } from '../../core/state/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Item } from '../../core/entities/item.model';
import { User } from '../../core/entities/user.model';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  const mockStateService = jasmine.createSpyObj('StateService', [
    'loadItems',
    'getState',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent, HttpClientTestingModule],
      providers: [{ provide: StateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockStateService.getState.and.returnValue(
      of({ item: [{ id: '1' } as Item] }),
    );
    mockStateService.loadItems.and.returnValue(of({ item: [] }));
    expect(component).toBeTruthy();
  });

  it('should load items from state on initialization', () => {
    const items: Item[] = [
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
    ];

    const state = {
      loginState: 'idle' as unknown as LoginState,
      token: 'myToken',
      currenPayload: null,
      currenUser: null,
      item: items,
    };

    mockStateService.getState.and.returnValue(of(state));

    component.ngOnInit();
    expect(mockStateService.loadItems).toHaveBeenCalled();
    expect(component.item).toEqual(items);
  });
});
