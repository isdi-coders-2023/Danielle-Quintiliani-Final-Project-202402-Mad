import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBtnComponent } from './filter-btn.component';
import { StateService } from '../../core/state/state.service';

describe('FilterBtnComponent', () => {
  let component: FilterBtnComponent;
  let fixture: ComponentFixture<FilterBtnComponent>;
  let stateService: StateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBtnComponent],
      providers: [
        {
          provide: StateService,
          useValue: jasmine.createSpyObj('StateService', ['filterCategory']),
        },
      ],
    }).compileComponents();
    stateService = TestBed.inject(StateService);
    fixture = TestBed.createComponent(FilterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call filterCategory method of state service with selected category value', () => {
    const selectedCategory = 'CLOTHES';
    const event = {
      target: {
        value: selectedCategory,
      } as HTMLSelectElement,
    } as unknown as Event;

    component.filterByCategory(event);

    expect(stateService.filterCategory).toHaveBeenCalledWith(selectedCategory);
  });

  it('should not call filterCategory method if selectedCategory is falsy', () => {
    const event = {
      target: {
        value: '',
      } as HTMLSelectElement,
    } as unknown as Event;

    component.filterByCategory(event);

    expect(stateService.filterCategory).not.toHaveBeenCalled();
  });
});
