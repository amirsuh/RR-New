import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError(err =>{
    if (err.status === 401) {
        console.error('Unauthorized → redirect to login');
      } else if (err.status >= 500) {
        console.error('Server error → show toast');
      }
    return throwError(() => err);
  })
);
