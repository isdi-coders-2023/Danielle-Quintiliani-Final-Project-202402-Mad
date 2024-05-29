import { Component, inject } from '@angular/core';
import ItemComponent from '../item/item.component';
import { StateService } from '../../core/state/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  state = inject(StateService);
  constructor() {
    this.initialLogin();
  }

  initialLogin() {
    const tokenString = localStorage.getItem('enDosRueda');
    if (tokenString) {
      const { token } = JSON.parse(tokenString);
      this.state.setLogin(token);
    }
  }
}
