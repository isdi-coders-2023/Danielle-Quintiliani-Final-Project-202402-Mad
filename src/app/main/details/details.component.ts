import { Component, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../core/entities/item.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {
  state = inject(StateService);
  id!: string;
  itemInfo!: Item;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.state.getState().subscribe((state) => {
      if (state.item) {
        this.itemInfo = state.item.find((item) => item.id === this.id)!;
      }
    });
  }
}
