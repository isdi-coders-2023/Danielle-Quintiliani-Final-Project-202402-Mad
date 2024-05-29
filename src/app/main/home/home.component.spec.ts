import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';

import { of } from 'rxjs';
import { StateService } from '../../core/state/state.service';
import { Item } from '../../core/entities/item.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const stateService = jasmine.createSpyObj('StateService', {
    setLogin: 'isLoggedIn',
    getState: { isLoggedIn: false },
    loadItems: of([] as unknown as Item[]),
  });
  stateService.getState.and.returnValue(of({ isLoggedIn: false }));
  stateService.setLogin.and.returnValue(of({ isLoggedIn: true }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: StateService, useValue: stateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
