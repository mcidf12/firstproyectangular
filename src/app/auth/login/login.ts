import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgxSonnerToaster],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {
  //uso de formularios reactivos
  loginForm!: FormGroup;
  error: string | null = null;
  mensaje = '';
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  get usuario() {
    return this.loginForm.controls['usuario'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }


  login() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }

    this.loading = true;
    const raw = this.loginForm.value;
    const usuario = raw.usuario;
    const password = raw.password;

    const payload = usuario.includes('@')
      ? { email: usuario, password }
      : { cliente: usuario, password };

    this.api.login(payload as any).subscribe({
      next: (res) => {
        this.loading = false;
        const token = res?.token;
        /*if (token) {
          localStorage.setItem('authToken', token);
          console.log('Token usado en la request:', token);
        }*/
        this.router.navigateByUrl('/dashboard');
        this.loginForm.reset();
      },
      error: (e) => {
        this.loading = false;

        if (e?.status === 0) {
          toast.error('No se pudo conectar al servidor');
        } else if (e?.status === 401) {
          toast.error('Credenciales inválidas');
        } else if (e?.status === 404) {
          toast.error('Usuario no encontrado');
        } else {
          toast.error('Error al iniciar sesión');
        }
      }
    });
  }



}
