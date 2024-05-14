import { Component, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export default class FavoriteComponent {
  state = inject(StateService);
  favoriteItems = this.state.getCurrentUser().favorite;
}
