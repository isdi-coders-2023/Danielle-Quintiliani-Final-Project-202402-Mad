import { Component, Input, inject } from '@angular/core';
import { Item } from '../../core/entities/item.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  router = inject(Router);
  @Input()
  itemInfo!: Item;

  goToDeatil(id: string) {
    this.router.navigate(['/deatil', id]);
  }
}
