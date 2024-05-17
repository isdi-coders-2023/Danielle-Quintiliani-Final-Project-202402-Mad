import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StateService } from './core/state/state.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const stateService = jasmine.createSpyObj('StateService', {
    setLogin: 'isLoggedIn',
    getState: { isLoggedIn: false },
  });
  stateService.getState.and.returnValue(of({ isLoggedIn: false }));
  stateService.setLogin.and.returnValue(of({ isLoggedIn: true }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: StateService, useValue: stateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set login state on initial load', () => {
    const token = 'test-token';
    localStorage.setItem('enDosRueda', JSON.stringify({ token }));
    fixture.detectChanges();
    component.initialLogin();
    expect(stateService.isLoggedIn).toHaveBeenCalled;
    expect(stateService.setLogin).toHaveBeenCalledWith(token);
  });
});
