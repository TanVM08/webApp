import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG } from 'keycloak-angular';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AppHttpInterceptor } from './common/helpers/http.interceptor';
import { KeycloakAuthService } from './common/service/keycloak/keycloak-auth.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
export function HttpLoaderFactory(): TranslateLoader {
  return new TranslateHttpLoader();
}


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideAnimations(),
  provideToastr(),
  provideHttpClient(withInterceptorsFromDi(), withFetch()),
  importProvidersFrom(BrowserAnimationsModule,OAuthModule.forRoot()),
  provideTranslateService({
    loader: provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    }),
    lang: 'vi',
    fallbackLang: 'vi'
  }),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true,
  },
  provideAppInitializer(() => {
    const keycloak = inject(KeycloakAuthService);
    return keycloak.init();
  }),
  {
    provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    useValue: [
      {
        urlPattern: /http:\/\/localhost:8081\/api\/.*/,
        httpMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    ],
  }
  ]
};
