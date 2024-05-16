/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import DetailsComponent from './details.component';
import { ActivatedRoute, RouterModule, provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StateService, initialState } from '../../core/state/state.service';
import { Item } from '../../core/entities/item.model';
const item: Item = {
  id: '',
  title: '',
  content: '',
  price: '',
  owner: {
    id: '',
    name: '',
    email: '',
    password: '',
    birthday: '',
    avatar: null,
    favorite: undefined,
    item: undefined,
    role: 'USER',
  },
  category: 'CLOTHES',
  ownerItemId: '',
  image: [],
  createdAt: '',
};
const mockStateService = jasmine.createSpyObj('StateService', ['getState']);
describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, RouterModule, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => 'sample_id',
              },
            },
          },
        },
        {
          provide: StateService,
          useValue: mockStateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set itemInfo correctly based on route id', () => {
    const state = { ...initialState, item: [item] };
    mockStateService.getState.and.returnValue(state);
    expect(component.id).toBe('sample_id');
    expect(component.itemInfo).toEqual(item);
  });
});
