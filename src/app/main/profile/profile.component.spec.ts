import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProfileComponent from './profile.component';

import { StateService } from '../../core/state/state.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { routes } from '../../app.routes';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let stateServiceMock: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    stateServiceMock = jasmine.createSpyObj('StateService', {
      getState: of({ currenUser: { name: 'test' } }),
    });
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideRouter(routes),
        { provide: StateService, useValue: stateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getState should be called on ngOnInit', () => {
    component.ngOnInit();
    expect(stateServiceMock.getState).toHaveBeenCalled();
  });
});
