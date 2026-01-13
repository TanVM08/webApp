import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../config/auth.config';
@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private oauthService: OAuthService
  ) { }

  async init() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.configure(authConfig);

      // Load cấu hình từ Keycloak + login
      try {
        // Load discovery document + login (Code Flow)
        await this.oauthService.loadDiscoveryDocumentAndLogin();

        // Nếu token hợp lệ, setup automatic silent refresh
        if (this.isTokenValid) {
          this.oauthService.setupAutomaticSilentRefresh();
        }
      } catch (err) {
        console.error('Error during OAuth initialization', err);
      }
    }
  }

  async login() {
    await this.oauthService.initLoginFlow();
  }

  get userId(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : '';
  }

  get isTokenValid(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get fullName(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : '';
  }

  get token(): string | null {
    return this.oauthService.getAccessToken() || null;
  }


  logout() {
    this.oauthService.logOut();
  }
}
