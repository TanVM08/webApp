import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AppHttpInterceptor } from './common/helpers/http.interceptor';
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
  importProvidersFrom(BrowserAnimationsModule),
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
  ]
};
