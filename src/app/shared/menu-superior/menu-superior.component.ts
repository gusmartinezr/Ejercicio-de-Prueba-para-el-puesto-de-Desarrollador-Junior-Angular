import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
})
export class MenuSuperiorComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Categories', routerLink: '/categories/index' },
      { label: 'Items', routerLink: '/items/index' },
    ];
  }
}
