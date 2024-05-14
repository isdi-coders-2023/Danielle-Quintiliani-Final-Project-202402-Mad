import { ComponentFixture, TestBed } from '@angular/core/testing';

import MyItemComponent from './my-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyItemComponent', () => {
  let component: MyItemComponent;
  let fixture: ComponentFixture<MyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyItemComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
