import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export default class FavoriteComponent implements OnInit {
  state = inject(StateService);
  route = inject(Router);
  favoriteItems = this.state.getCurrentUser().favorite;

  ngOnInit(): void {
    this.favoriteItems = this.state.getCurrentUser().favorite;
  }
  removeFavorite(itemId: string) {
    this.state.removeFavorite(itemId);
    this.route.navigate(['/home']);
  }
}
