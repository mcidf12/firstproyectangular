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
  loading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {

     const savedUsuario = localStorage.getItem('savedUsuario') ?? '';

    this.loginForm = this.fb.group({
      usuario: [savedUsuario, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [!!savedUsuario] // true si había usuario guardado
    })
  }

  get usuario() {
    return this.loginForm.controls['usuario'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  get remember() {
    return this.loginForm.controls['remember'];
  }


  login() {
    //console.log('loginForm.value', this.loginForm.value);

    //if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
      if (this.usuario.invalid || this.password.invalid) {
    this.loginForm.markAllAsTouched();
    toast.error("Completar los camposo requeridos");
    return;
  }

    this.loading = true;
    const { usuario, password, remember } = this.loginForm.value;

    /*const raw = this.loginForm.value;
    const usuario = raw.usuario;
    const password = raw.password;*/

    const payload = usuario.includes('@')
      ? { email: usuario, password }
      : { cliente: usuario, password };

    this.api.login(payload as any).subscribe({
      next: (res) => {
        this.loading = false;
        //const token = res?.token;
        sessionStorage.setItem('authToken', res.token);


        /*if (token) {
          localStorage.setItem('authToken', token);
          //console.log('Token usado en la request:', token);
        }*/

          // Guardar token: localStorage si "recordar", sessionStorage si no.
        //if (token) {
          if (remember) {
            //localStorage.setItem('authToken', token);
            localStorage.setItem('savedUsuario', usuario); // guardar usuario para precarga
            //console.log('Credenciales guardadas')
            //console.log('Token en localStorage:', localStorage.getItem('authToken'));
          } else {
            //sessionStorage.setItem('authToken', token);
            localStorage.removeItem('savedUsuario'); // borrar cualquier usuario guardado
            localStorage.removeItem('authToken'); // evitar token persistente por si existía
            //console.log('Token guardado en sessionStorage')
            //console.log('Token en sessionStorage:', sessionStorage.getItem('authToken'));

          }
        //}

        //navegamos al dashboard
        toast.success('Sesión iniciada correctamente');
        this.router.navigateByUrl('/dashboard');
        //this.loginForm.reset();
        if (!remember){
            this.loginForm.patchValue({password: ''});
        }
      },
      error: (e) => {
        this.loading = false;

        if (e?.status === 0) {
          toast.error('No se pudo conectar al servidor');
        } else if (e?.status === 401) {
          toast.error('Credenciales inválidas');
        } else if (e?.status === 404) {
          toast.error('Usuario no encontrado');
        }  else if (e?.status === 403) {
          toast.error('Correo no verificado');
        } else {
          toast.error('Error al iniciar sesión');
        }
      }
    });
  }


  viewPassword() {
    this.showPassword = !this.showPassword;
  }
}
