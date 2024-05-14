import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';
import { ItemListComponent } from '../item-list/item-list.component';
import { Item } from '../../core/entities/item.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export default class ItemComponent implements OnInit {
  private state = inject(StateService);
  public item: Item[] = [];

  constructor() {}

  ngOnInit() {
    this.state.getState().subscribe((state) => {
      console.log('my state:', state);
      console.log('my fav item:', state.currenUser?.favorite);
      if (state.item) {
        this.item = state.item;
      }
    });
    console.log('favorite items:', this.state.getCurrentUser()?.favorite);
    this.state.loadItems();
  }
}
