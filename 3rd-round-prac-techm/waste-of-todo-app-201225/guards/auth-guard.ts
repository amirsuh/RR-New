import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  return authService.isLoggedIn() || router.createUrlTree(['/login']);

  // const router = inject(Router);
  // return localStorage.getItem('token') ? true : router.createUrlTree(['/login']);
};
