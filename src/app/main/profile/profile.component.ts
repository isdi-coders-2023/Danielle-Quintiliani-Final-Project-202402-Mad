import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../../core/state/state.service';
import { User } from '../../core/entities/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
  stateService = inject(StateService);
  currentUser: User | null = null;

  ngOnInit(): void {
    this.stateService.getState().subscribe((state) => {
      if (state.currenUser) {
        console.log('profile:', state.currenUser);
        console.log('image:', state.currenUser.avatar);
        console.log('item:', state.currenUser.item);
        this.currentUser = state.currenUser;
      }
    });
  }
}
