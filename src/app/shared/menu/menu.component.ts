import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StateService } from '../../core/state/state.service';
import { NgIf } from '@angular/common';
import { ClickOutsideDirective } from '../../core/directive/click-outside.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, NgIf, ClickOutsideDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  public state = inject(StateService);
  @Input() init: boolean | undefined;
  @Output() opened = new EventEmitter();
  isLogged!: boolean;

  active = false;

  ngOnInit() {
    this.state.getState().subscribe((state) => {
      const log = state.loginState;
      if (log === 'logged') {
        this.isLogged = true;
      }
    });

    this.active = this.init || false;
  }
  onBurgerClicked() {
    this.active = !this.active;
    this.toggleMenuVisibility();
    this.opened.emit();
  }
  closeMenu() {
    this.active = false;
    this.toggleMenuVisibility();
  }

  private toggleMenuVisibility() {
    const menu = document.querySelector('.menu');
    if (this.active) {
      menu?.classList.add('visible');
    } else {
      menu?.classList.remove('visible');
    }
  }
}
