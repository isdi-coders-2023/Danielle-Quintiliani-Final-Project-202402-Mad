import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
