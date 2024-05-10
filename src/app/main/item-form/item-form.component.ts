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
    image: [''],
  }) as FormGroup;
  @ViewChild('image') image!: ElementRef;

  submit() {
    const formData = new FormData();
    formData.append('title', this.addItem.value.title);
    formData.append('content', this.addItem.value.content);
    formData.append('price', this.addItem.value.price.toString());
    formData.append('image', this.addItem.value.image);

    return this.repo.createItem(formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/profile']);
    });
  }
  onFileChange() {
    const htmlElement: HTMLInputElement = this.image.nativeElement;
    const file = htmlElement.files!;
    console.log(file);
    this.addItem.patchValue([{ image: file }]);
  }
}
