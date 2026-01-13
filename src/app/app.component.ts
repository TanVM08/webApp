import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }
  ngOnInit(): void {
  }
  title = 'webapp';
}
