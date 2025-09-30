import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Banca } from './pages/banca/banca';

export const routes: Routes = [
    {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full' },    //si no coinicide con ninguna ruta regresa al inicio de sesion
    {path:'iniciar-sesion', component:Login},
    {path:'estado-cuenta', component:Banca},
    {path:'dashboard', component:Dashboard},
];
