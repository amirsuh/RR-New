import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { authInterceptorFn } from './core/interceptors/auth.interceptor';
import { errorInterceptorFn } from './core/interceptors/error-interceptor-fn.interceptor';
import { cacheInterceptorFn } from './core/interceptors/cache-interceptor-fn.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),provideHttpClient(withInterceptors([
      authInterceptorFn,
      errorInterceptorFn,
      cacheInterceptorFn
    ]))

  ]
};
