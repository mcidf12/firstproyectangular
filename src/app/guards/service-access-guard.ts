import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from '../services/user/clientService';
import { inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { catchError, map, of } from 'rxjs';

export const serviceAccessGuard: CanActivateFn = (route, state) => {
  //return true;
  const clientService = inject(ClientService);
  const router = inject(Router);

  const numeroCliente = route.params['numero_cliente'];

  if (!numeroCliente) {
    setTimeout(() => toast.error('Número de cliente no especificado'), 0);
    router.navigate(['/servicios']);
    return false;
  }

  //verificar si se tiene acceso al usuario
  return clientService.verifyAccessService(numeroCliente).pipe(
    map(response => {
      if (response.has_access) {
        //guardar en localStogare solo si se tiene acceso
        localStorage.setItem('servicio_activo', numeroCliente);
        return true;
      } else {
        setTimeout(() => toast.error('No tienes acceso a este servicio'), 0);
        router.navigate(['/servicios']);
        return false;
      }
    }),
    catchError((error) => {
      //console.error('Error verificando acceso', error);

      setTimeout(() => {
      if (error?.status === 404) {
        toast.error('Servicio no encontrado');
      } else if (error?.status === 403) {
        toast.error('No tienes permiso para acceder');
      } else {
        toast.error('Error al verificar acceso');
      }
    }, 0);

      router.navigate(['/servicios']);
      return of(false);
    })
  );


}
