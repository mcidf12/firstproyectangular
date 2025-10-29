import { Routes } from '@angular/router';

import { requireAuthGuard } from './auth/require-auth-guard';
import { onlyGuestsGuard } from './auth/only-guests-guard';

import { Login } from './auth/login/login';
import { CreateAccount } from './auth/create-account/create-account';
import { Recover } from './auth/recover/recover';
import { ResponseRecover } from './auth/responseRecover/response-recover';

import { Dashboard } from './pages/dashboard/dashboard';
import { Banca } from './pages/banca/banca';
import { Client } from './pages/client/client';
import { Payment } from './pages/payment/payment';
import { Profile } from './pages/profile/profile';
import { Visits } from './pages/visits/visits';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { EditPassword } from './pages/edit-password/edit-password';


export const routes: Routes = [
    {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full' },    //si no coinicide con ninguna ruta regresa al inicio de sesion
    
  { path: 'iniciar-sesion', component: Login, canActivate: [onlyGuestsGuard] },
  { path: 'crear-cuenta', component: CreateAccount, canActivate: [onlyGuestsGuard] },
  { path: 'recuperar-password', component: Recover, canActivate: [onlyGuestsGuard] },
  { path: 'response-password', component: ResponseRecover },

  // Requieren login
  { path: 'dashboard', component: Dashboard, canActivate: [requireAuthGuard] },
  { path: 'estado-cuenta', component: Banca, canActivate: [requireAuthGuard] },
  { path: 'cliente', component: Client, canActivate: [requireAuthGuard] },
  { path: 'formas-de-pago', component: Payment, canActivate: [requireAuthGuard] },
  { path: 'perfil', component: Profile, canActivate: [requireAuthGuard] },
  { path: 'visitas', component: Visits, canActivate: [requireAuthGuard] },
  { path: 'edit-perfil', component: EditProfile, canActivate: [requireAuthGuard] },
  { path: 'edit-password', component: EditPassword, canActivate: [requireAuthGuard] },

  
  { path: '**', redirectTo: '/iniciar-sesion' }
    
];
