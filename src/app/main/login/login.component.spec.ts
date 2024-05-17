import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import LoginComponent from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RepoService } from '../../core/repo/repo.service';
import { StateService } from '../../core/state/state.service';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginUserDto } from '../../core/entities/user.model';
import { routes } from '../../app.routes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  /* let mockRepoService: jasmine.SpyObj<RepoService>; */
  /*   let mockStateService: StateService;
  let mockRouter: Router; */
  const mockRepoService = jasmine.createSpyObj('RepoService', ['login']);
  const mockStateService = jasmine.createSpyObj('StateService', [
    'setLogin',
    'setLoginState',
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        provideRouter(routes),
        { provide: RepoService, useValue: mockRepoService },
        { provide: StateService, useValue: mockStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
    spyOn(console, 'error');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit login form successfully', fakeAsync(() => {
    const token = 'mockedToken';
    mockRepoService.login.and.returnValue(of({ token: token }));

    const loginFormData = {
      name: 'test',
      email: 'test@example.com',
      password: 'password',
    };
    const loginResponse = { token };

    mockRepoService.login.and.returnValue(of(loginResponse));

    component.formLogin.setValue(loginFormData);

    component.submit();
    tick();

    expect(mockRepoService.login).toHaveBeenCalledWith(
      loginFormData as LoginUserDto,
    );
    expect(mockStateService.setLogin).toHaveBeenCalledWith(token);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login error', fakeAsync(() => {
    const err = new Error('Invalid credentials');
    const loginFormData = {
      name: 'test',
      email: 'test@example.com',
      password: 'password',
    };

    mockRepoService.login.and.returnValue(throwError(() => err));

    component.formLogin.setValue(loginFormData);

    component.submit();
    tick();

    expect(mockRepoService.login).toHaveBeenCalledWith(loginFormData);
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('error');
    expect(console.error).toHaveBeenCalled();
  }));
});
