import { Component } from '@angular/core';
import { Nav } from '../../shared/nav/nav';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  isLogin=false;
  username = 'Marcos'
  error='';

  constructor( private router:Router, private api:LoginS) {
   
  }

 logout(): void {
  console.log('Token actual antes de logout:', localStorage.getItem('authToken'));
  this.api.logout().subscribe({
  next: res => {
    console.log('Logout exitoso');
    this.api.clearToken();
    this.router.navigate(['/iniciar-sesion']);
  },
  error: err => {
    if (err.status === 401) {
      console.warn('Token inválido o expirado');
      this.api.clearToken();
      this.router.navigate(['/iniciar-sesion']);
    }
  }
});
}





}
