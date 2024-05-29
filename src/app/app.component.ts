import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import HomeComponent from './main/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styles: `
    .body {
      overflow-y: auto;
      max-height: 100vh;
      background-image: url('../assets/backgroundtexture.webp');
    }
  `,
})
export class AppComponent {}
