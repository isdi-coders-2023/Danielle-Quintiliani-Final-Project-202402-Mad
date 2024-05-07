import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateService } from '../../core/state/state.service';
import { RepoService } from '../../core/repo/repo.service';
import { Router } from '@angular/router';
import { LoginUserDto } from '../../core/entities/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private state = inject(StateService);
  private repo = inject(RepoService);
  private fb = inject(FormBuilder);
  formLogin = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
  });
  router = inject(Router);

  submit() {
    this.repo.login(this.formLogin.value as LoginUserDto).subscribe({
      next: ({ token }) => {
        console.log(token);
        this.state.setLogin(token);
        console.log('Logged in', token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
        console.log(this.state);
      },
    });
  }
}
