import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  @Input() init: boolean | undefined;
  @Output() opened = new EventEmitter();

  active = false;

  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    const menu = document.querySelector('.menu');
    if (this.active) {
      menu!.classList.add('visible');
    } else {
      menu!.classList.remove('visible');
    }
    this.opened.emit();
  }

  logout() {
    localStorage.removeItem('enDosRueda');
    window.location.reload();
  }
}
