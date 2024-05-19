import { Component, inject } from '@angular/core';
import { Category } from '../../core/entities/item.model';
import { StateService } from '../../core/state/state.service';

@Component({
  selector: 'app-filter-btn',
  standalone: true,
  imports: [],
  templateUrl: './filter-btn.component.html',
  styles: ``,
})
export class FilterBtnComponent {
  categories!: Category;
  state = inject(StateService);

  filterByCategory(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory) {
      this.state.filterCategory(selectedCategory as Category);
    }
  }
}
