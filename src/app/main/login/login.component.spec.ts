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
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRepoService: jasmine.SpyObj<RepoService>;
  let mockStateService: StateService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: RepoService, useValue: mockRepoService },
        { provide: StateService, useValue: mockStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
    mockRepoService = jasmine.createSpyObj('RepoService', ['login']);
    mockStateService = jasmine.createSpyObj('StateService', [
      'setLogin',
      'setLoginState',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit login form successfully', fakeAsync(() => {
    const token = 'exampleToken';
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

    expect(mockRepoService.login).toHaveBeenCalledWith(loginFormData);
    expect(mockStateService.setLogin).toHaveBeenCalledWith(token);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login error', fakeAsync(() => {
    const errorMessage = 'Invalid credentials' as unknown as Error;
    const loginFormData = {
      name: 'test',
      email: 'test@example.com',
      password: 'password',
    };
    mockRepoService.login(loginFormData);
    mockRepoService.login.and.throwError(errorMessage);

    component.formLogin.setValue(loginFormData);

    component.submit();
    tick();

    expect(mockRepoService.login).toHaveBeenCalledWith(loginFormData);
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('error');
    expect(console.error).toThrowError('Invalid credentials');
  }));
});
