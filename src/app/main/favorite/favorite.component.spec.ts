import { ComponentFixture, TestBed } from '@angular/core/testing';
import FavoriteComponent from './favorite.component';
import { StateService } from '../../core/state/state.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  const stateService = jasmine.createSpyObj('StateService', {
    getCurrentUser: { favorite: [] },
    removeFavorite: { favorite: ['1'] },
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteComponent],
      providers: [
        provideRouter(routes),
        { provide: StateService, useValue: stateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove item from favorites', () => {
    component.removeFavorite('1');
    expect(stateService.removeFavorite).toHaveBeenCalledWith('1');
  });
});
