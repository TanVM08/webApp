import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../base/shared/material.module';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KeycloakAuthService } from '../../common/service/keycloak/keycloak-auth.service';
import { FetchApiService } from '../../common/service/api/fetch-api.service';
import { LOGIN_ENDPOINT } from '../../common/enum/EApiUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MATERIAL_IMPORTS, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private keyCloakAuth: KeycloakAuthService,
    private api: FetchApiService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }
  onSubmit() {
    this.login();
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  logOut() {
    this.keyCloakAuth.logout();
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let params = this.loginForm.value;
    this.api.get('home').subscribe(
      (res) => {
        debugger
        this.router.navigate(['/dashboard']);
      }, (error) => {
        this.router.navigate(['/dashboard']);
      });
  }
}
