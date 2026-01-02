import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class NavComponent {
  servicios: any[] = [];
  constructor(private auth: LoginS, private router: Router) { }

  @Output() linkClick = new EventEmitter<void>();


  logout() {
    this.auth.logoutAndRedirect();
  }

  goDashboard(){
    this.auth.goNavigate('/dashboard')
  }
 
  goEstadoCuenta(){
    this.auth.goNavigate('/estadoCuenta')
  }
 
  goPerfil(){
    this.auth.goNavigate('/perfil')
  }
 




}
 