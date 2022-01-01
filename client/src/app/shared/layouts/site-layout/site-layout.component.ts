import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styles: [
    `
      body {
        background-color: #f9f7ee;
      }
    `,
  ],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: any;

  links = [
    { url: '/test', name: 'Обзор' },
    { url: '/departs', name: 'Отделы' },
    { url: '/users', name: 'Сотрудники' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
  ];

  constructor(private auth: AuthService, private router: Router) {}
  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
