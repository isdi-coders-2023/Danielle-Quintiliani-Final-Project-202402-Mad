import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RepoService } from '../../core/repo/repo.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StateService } from '../../core/state/state.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export default class ItemFormComponent {
  router = inject(Router);
  private repo = inject(RepoService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  addItem = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    price: ['', Validators.required],
    image: [[]],
  }) as FormGroup;
  @ViewChild('image') image!: ElementRef;
  formData = new FormData();
  submit() {
    this.formData.append('title', this.addItem.value.title);
    this.formData.append('content', this.addItem.value.content);
    this.formData.append('price', this.addItem.value.price.toString());
    this.formData.append(
      'ownerItemId',
      this.state.getCurrentUser()?.id.toString(),
    );

    return this.repo.createItem(this.formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.image.nativeElement;
    const files = htmlElement.files!;

    for (let i = 0; i < files.length; i++) {
      this.formData.append('image', files[i]);
    }
  }
}
