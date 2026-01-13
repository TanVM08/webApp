import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FetchApiService } from '../../../common/service/api/fetch-api.service';
import { ToastService } from '../../../common/service/toast/toast.service';

@Component({
  selector: 'nav-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatBadgeModule, MatMenuModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  assetPath = environment.assetPath;
  NavCollapse = output<boolean>();
  isCollapsed = false;
  hidden = false;
  userName!: string;
  roleName!: string;

  constructor(
    private router: Router,
    private api: FetchApiService,
    private toast: ToastService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
   
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  toggleNavCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.NavCollapse.emit(this.isCollapsed);
  }

  doViewProfile() {
    this.router.navigate(['/profile']);
  }

  logout(): void {

  }

  doChangePassword() {

  }
}
