import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'fake-token';
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(authReq).pipe(catchError(err => { /* handle 401 */ return throwError(() => err); }));
};
