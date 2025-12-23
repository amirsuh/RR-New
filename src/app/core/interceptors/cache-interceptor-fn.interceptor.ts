import { HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache = new Map<string, any>()

export const cacheInterceptorFn: HttpInterceptorFn = (req, next) => {
  if(req.method === 'GET') return next(req)
  const cached = cache.get(req.urlWithParams);
  if(cached) return of(cached.clone)

  return next(req).pipe(
    tap(event => {
      if (event.type === 4) { // HttpResponse
        cache.set(req.urlWithParams, event);
      }
    })

  )
};
