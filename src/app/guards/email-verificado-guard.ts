import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { toast } from 'ngx-sonner';

export const emailVerificadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = route.queryParams['token'];

  //si no hay token redirige a vista de inicio de sesion
  if(!token){
    router.navigate(['/iniciar-sesion']);
    //toast.error("acceso denegado");
    return false;
  }

  // Validar el token 
  return http.post<{valid: boolean}>('http://localhost:8000/api/verify-token', { token })
    .pipe(
      map(response => {
        if (response.valid) {
          return true;
        } else {
          router.navigate(['/']);          
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/']);
        return of(false);
      })
    );
};
