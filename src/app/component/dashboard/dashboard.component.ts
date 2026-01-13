import { Component, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../base/shared/material.module';
import { ToastService } from '../../common/service/toast/toast.service';
@Component({
  selector: 'app-dashboard',
  imports: [
    MATERIAL_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private toastr: ToastService
  ) {

  }
  ngOnInit(): void {
  }

  doToast() {
    this.toastr.showSuccess('TanVM', 'messsage');
    this.toastr.showInfo('TanVM', 'messsage');
    this.toastr.showWarn('TanVM', 'messsage');
    this.toastr.showError('TanVM', 'messsage');
  }
  

}
