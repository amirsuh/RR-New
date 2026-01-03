import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './core/interceptors/auth.interceptor';
import { errorInterceptorFn } from './core/interceptors/error-interceptor-fn.interceptor';
import { cacheInterceptorFn } from './core/interceptors/cache-interceptor-fn.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptorFn,
      errorInterceptorFn,
      cacheInterceptorFn
    ])),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ]
};
