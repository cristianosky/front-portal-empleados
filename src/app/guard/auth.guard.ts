import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // 👉 si no tiene token lo mando al login
    router.navigate(['/login']);
    return false;
  }

  return true;
};