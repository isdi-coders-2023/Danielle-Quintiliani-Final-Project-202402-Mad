import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../../app.routes';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, HttpClientTestingModule],
      providers: [provideRouter(routes)],
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
});
