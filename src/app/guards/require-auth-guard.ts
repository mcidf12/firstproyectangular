import { CanActivateFn, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const requireAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (hasToken()) return true;
  //alert("No puede acceder");
  router.navigate(['/iniciar-sesion']);
  return false;
};

export function hasToken(): boolean {
  return !!localStorage.getItem('authToken');
}