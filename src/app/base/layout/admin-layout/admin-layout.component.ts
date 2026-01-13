import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MATERIAL_IMPORTS } from '../../shared/material.module';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderComponent, NavBarComponent,MATERIAL_IMPORTS],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  ngOnInit(): void {
  }
  navCollapsed: boolean = false;

  NavCollapse(data: boolean) {
    this.navCollapsed = data;
    
  }
}
