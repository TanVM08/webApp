import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal, signal, OnChanges, SimpleChanges, input, computed } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavBarItemComponent } from '../nav-bar-item/nav-bar-item.component';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../common/service/auth/authentication.service';


export type MenuItem = {
  icon?: string,
  label: string,
  route?: string,
  subItems?: MenuItem[]
}

export type Menu = {
  title?: string,
  data: MenuItem[]
}


@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatListModule, CommonModule, RouterModule, NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnChanges {
  constructor(
    private auth: AuthenticationService
  ) {

  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Tổng quan',
      route: '/dashboard',
    },
    {
      icon: 'settings',
      label: 'Cấu hình bãi đỗ',
      route: 'login',
    },
    {
      icon: 'people_outline',
      label: 'Quản lý nhân viên',
      route: 'dashboards',
    },
    {
      icon: 'person_outline',
      label: 'Quản lý chủ đầu tư',
      route: 'users',
    }
  ])

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
