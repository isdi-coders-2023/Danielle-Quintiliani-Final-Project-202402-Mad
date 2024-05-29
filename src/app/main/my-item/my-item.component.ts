import { Component, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';

@Component({
  selector: 'app-my-item',
  standalone: true,
  imports: [],
  templateUrl: './my-item.component.html',
  styleUrl: './my-item.component.css',
})
export default class MyItemComponent {
  state = inject(StateService);
  userItems = this.state.getCurrentUser().item;
}
