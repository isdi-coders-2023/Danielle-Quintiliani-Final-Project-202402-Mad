import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';
import { ItemListComponent } from '../item-list/item-list.component';
import { Item } from '../../core/entities/item.model';
import { FilterBtnComponent } from '../../shared/filter-btn/filter-btn.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemListComponent, FilterBtnComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export default class ItemComponent implements OnInit {
  private state = inject(StateService);
  public item: Item[] = [];

  constructor() {}

  public filterBy(input: HTMLInputElement) {
    if (input.value) {
      this.item = this.item.filter((p) => p.category === input.value);
    }
  }

  public search(input: HTMLInputElement) {
    if (input.value) {
      this.item = this.item.filter((p) => p.title === input.value);
    }
  }

  public sortPriceDesc(): void {
    this.item = this.item.sort((a, b) => Number(a.price) - Number(b.price));
  }

  public sortPriceAsc() {
    this.item = this.item.sort((a, b) => Number(b.price) - Number(a.price));
  }

  ngOnInit() {
    this.state.getState().subscribe((state) => {
      if (state.item) {
        this.item = state.item;
      }
    });

    this.state.loadItems();
  }
}
