import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
  ) {
  }

  authenticate(oauth2: any) {
    localStorage.removeItem(environment.accessToken);
    localStorage.removeItem(environment.refeshToken);
    localStorage.setItem(environment.accessToken, oauth2.access_token);
    localStorage.setItem(environment.refeshToken, oauth2.refresh_token);
    const decoded: any = jwtDecode(oauth2.access_token);
    localStorage.setItem(environment.userInfo, decoded.sub);
    localStorage.setItem("menus", JSON.stringify(oauth2.menus));
  }

  getToken() {
    return localStorage.getItem(environment.accessToken);
  }

  isTokenExpired(): boolean {
    let token = localStorage.getItem(environment.accessToken);
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: any): any {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  getUserInfo() {
    const userInfo = localStorage.getItem(environment.userInfo);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getMenuInfo(): any {
    return JSON.parse(localStorage.getItem("menus") || "[]");
  }

  isLoggedIn(): boolean {
    let token: string | null = null;
    token = localStorage.getItem(environment.accessToken);
    if (token && !this.isTokenExpired()) {
      return true;
    }
    return false;
  }

}
