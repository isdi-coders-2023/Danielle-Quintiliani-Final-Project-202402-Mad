import { ComponentFixture, TestBed } from '@angular/core/testing';

import MyItemComponent from './my-item.component';
import { StateService } from '../../core/state/state.service';
import { of } from 'rxjs';

describe('MyItemComponent', () => {
  let component: MyItemComponent;
  let fixture: ComponentFixture<MyItemComponent>;
  let stateServiceMock: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    stateServiceMock = jasmine.createSpyObj('StateService', {
      getCurrentUser: of({ currenUser: { name: 'test' } }),
    });

    await TestBed.configureTestingModule({
      imports: [MyItemComponent],
      providers: [{ provide: StateService, useValue: stateServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
