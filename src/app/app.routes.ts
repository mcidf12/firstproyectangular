import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Banca } from './pages/banca/banca';

export const routes: Routes = [
    {path:'',redirectTo:'/inicio', pathMatch:'full' },
    {path:'inicio', component:Dashboard},
    {path:'iniciar-sesion', component:Login},
    {path:'estado-cuenta', component:Banca}
];
