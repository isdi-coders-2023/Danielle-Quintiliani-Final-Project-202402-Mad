import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { StateService } from '../../core/state/state.service';
import { routes } from '../../app.routes';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let router: Router;
  let stateService: StateService;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    stateService = jasmine.createSpyObj('StateService', ['']);

    TestBed.configureTestingModule({
      imports: [ItemListComponent],
      providers: [
        provideRouter(routes),
        { provide: Router, useValue: router },
        { provide: StateService, useValue: stateService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
  });

  it('should call Router.navigate with the correct arguments when goToDeatil is called', () => {
    const id = 'some-id';
    component.goToDeatil(id);
    expect(router.navigate).toHaveBeenCalledWith(['/deatil', id]);
  });
});
