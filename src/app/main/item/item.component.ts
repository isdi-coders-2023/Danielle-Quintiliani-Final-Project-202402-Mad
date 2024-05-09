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
  public state = inject(StateService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public item: Item[] = [];

  constructor() {}

  ngOnInit() {
    this.state.loadItems();
    this.state.getState().subscribe((state) => {
      if (state.item) {
        this.item = state.item;
      }
      console.log('state in item component', state);
    });
    return this.item;
  }
}
