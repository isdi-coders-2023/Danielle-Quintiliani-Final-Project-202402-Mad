import { ComponentFixture, TestBed } from '@angular/core/testing';
import ItemFormComponent from './item-form.component';
import { RepoService } from '../../core/repo/repo.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../core/state/state.service';
import { By } from '@angular/platform-browser';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  let mockRouter;
  let mockRepoService: Partial<RepoService>;
  let mockStateService;
  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockRepoService = {
      createItem: jasmine.createSpy('createItem').and.returnValue(of({})),
    };

    mockStateService = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: RepoService, useValue: mockRepoService },
        { provide: StateService, useValue: mockStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call createUser method of RepoService with form data on submission', () => {
    const formData = new FormData();
    formData.append('title', '');
    formData.append('content', '');
    formData.append('price', '');
    formData.append('image', '');

    component.submit();

    expect(mockRepoService.createItem).toHaveBeenCalledWith(formData);
  });
  it('should patch value of image in form on file change', () => {
    const avatarElement: HTMLInputElement = fixture.debugElement.query(
      By.css('input[type="file"]'),
    ).nativeElement;

    const dataTransfer = new DataTransfer();
    const file = new File([''], 'image.png', { type: 'image/png' });
    dataTransfer.items.add(file);

    avatarElement.files = dataTransfer.files;
    fixture.detectChanges();
    component.onFileChange();
    expect(component.addItem.get('image')!.value[0]).toEqual(file);
  });
});
