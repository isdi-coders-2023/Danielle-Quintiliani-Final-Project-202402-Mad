import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RepoService } from '../../core/repo/repo.service';
import { StateService } from '../../core/state/state.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  router = inject(Router);
  private repo = inject(RepoService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  formRegister = this.fb.group({
    name: ['admin', Validators.required],
    password: ['admin', Validators.required],
    email: ['admin@sample.com', Validators.required],
    avatar: [''],
    birthDateString: ['', Validators.required],
  }) as FormGroup;

  @ViewChild('avatar') avatar!: ElementRef;

  submit() {
    const formData = new FormData();
    formData.append('name', this.formRegister.value.username);
    formData.append('password', this.formRegister.value.password);
    formData.append('email', this.formRegister.value.email);
    formData.append('avatar', this.formRegister.value.avatar);
    formData.append('birthDateString', this.formRegister.value.birthDateString);

    return this.repo.createUser(formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.avatar.nativeElement;
    const file = htmlElement.files![0];
    console.log(file);
    this.formRegister.patchValue({ avatar: file });
  }
}
