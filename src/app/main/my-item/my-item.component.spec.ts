import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StateService } from '../../core/state/state.service';
import MyItemComponent from './my-item.component';
import { User } from '../../core/entities/user.model';

describe('MyItemComponent', () => {
  let component: MyItemComponent;
  let fixture: ComponentFixture<MyItemComponent>;
  let stateServiceMock: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    stateServiceMock = jasmine.createSpyObj('StateService', ['getCurrentUser']);
    stateServiceMock.getCurrentUser.and.returnValue({
      id: '1',
      name: 'test',
      email: '',
      password: '',
      birthday: '',
      avatar: null,
      role: 'USER',
      item: [],
    });
    await TestBed.configureTestingModule({
      imports: [MyItemComponent],
      providers: [{ provide: StateService, useValue: stateServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyItemComponent);
    component = fixture.componentInstance;
  });

  it('should initialize userItems with valid user', () => {
    const user: User = {
      id: '1',
      name: 'test',
      email: '',
      password: '',
      birthday: '',
      avatar: null,
      role: 'USER',
      item: [],
    };
    fixture.detectChanges();
    expect(component.userItems).toEqual(user.item);
  });
});
