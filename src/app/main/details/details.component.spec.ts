import { ComponentFixture, TestBed } from '@angular/core/testing';
import DetailsComponent from './details.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { StateService, initialState } from '../../core/state/state.service';
import { Item } from '../../core/entities/item.model';
import { of } from 'rxjs';
import { routes } from '../../app.routes';

describe('DetailsComponent', () => {
  const item = {
    id: '',
    title: 'a',
    image: [{ secureUrl: '', originalName: '' }],
    owner: { id: '', name: '' },
  } as Item;
  const mockStateService = jasmine.createSpyObj('StateService', {
    getState: of({ ...initialState, item: [item] }),
  });

  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'sample_id',
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
    component.itemInfo = item;
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
