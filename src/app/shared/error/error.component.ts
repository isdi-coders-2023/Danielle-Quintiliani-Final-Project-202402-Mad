import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <div>
      <img
        src="../../../assets/404-mobile.webp"
        alt="404 error page"
        height="190px"
        width="370px"
      />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e5e5e5;
      height: 86vh;
    }
  `,
})
export default class ErrorComponent {}
