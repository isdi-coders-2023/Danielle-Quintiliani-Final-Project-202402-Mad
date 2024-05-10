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
      console.log(state);
      if (state.item) {
        this.item = state.item;
      }
    });
    this.state.loadItems();
  }
}
