import { ClickOutsideDirective } from './click-outside.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div appClickOutside (clickOutside)="onClickedOutside()">
      <p>Inside</p>
    </div>
    <div class="outside">Outside</div>
  `,
})
class TestComponent {
  onClickedOutside() {}
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickOutsideDirective],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(debugElement);
    expect(directive).toBeTruthy();
  });

  it('should trigger clickOutside event when clicking outside the element', () => {
    spyOn(component, 'onClickedOutside');

    const insideElement = debugElement.query(
      By.css('div[appClickOutside]'),
    ).nativeElement;
    insideElement.click();
    expect(component.onClickedOutside).not.toHaveBeenCalled();

    const outsideElement = debugElement.query(By.css('.outside')).nativeElement;
    outsideElement.click();
    expect(component.onClickedOutside).toHaveBeenCalled();
  });

  it('should not trigger clickOutside event when clicking inside the element', () => {
    spyOn(component, 'onClickedOutside');

    const insideElement = debugElement.query(
      By.css('div[appClickOutside]'),
    ).nativeElement;
    insideElement.click();
    expect(component.onClickedOutside).not.toHaveBeenCalled();
  });
});
