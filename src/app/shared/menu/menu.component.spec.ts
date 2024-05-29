import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../../app.routes';
import { of } from 'rxjs';
import { StateService } from '../../core/state/state.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let stateServiceMock;

  beforeEach(async () => {
    stateServiceMock = {
      getState: jasmine
        .createSpy('getState')
        .and.returnValue(of({ loginState: 'logged' })),
      setLogout: jasmine.createSpy('setLogout'),
    };

    await TestBed.configureTestingModule({
      imports: [MenuComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        { provide: StateService, useValue: stateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle burger menu', () => {
    const emitSpy = spyOn(component.opened, 'emit').and.callThrough();
    component.active = false;
    component.onBurgerClicked();
    const menu = document.querySelector('.menu');

    expect(component.active).toBe(true);
    expect(menu?.classList.contains('visible')).toBe(true);

    component.onBurgerClicked();
    expect(component.active).toBe(false);
    expect(menu?.classList.contains('visible')).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });
  it('should close the menu when clicking outside', () => {
    const emitSpy = spyOn(component.opened, 'emit').and.callThrough();
    component.active = true;
    fixture.detectChanges();

    // Simulate a click outside
    document.body.click();
    fixture.detectChanges();
    const menu = fixture.nativeElement.querySelector('.menu');

    expect(component.active).toBe(false);
    expect(menu.classList.contains('visible')).toBe(false);
    expect(emitSpy).toHaveBeenCalled;
  });
  it('should set isLogged to true when state loginState is "logged"', () => {
    component.ngOnInit();
    expect(component.isLogged).toBe(true);
  });
});
