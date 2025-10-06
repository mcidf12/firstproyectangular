import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; 
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {
  //uso de formularios reactivos
  loginForm!: FormGroup;
   error = '';

  constructor(private fb: FormBuilder, private router:Router, private api:LoginS) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }


  login(){
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }

    this.api.login(this.loginForm.value).subscribe({
      next: (res) => {
        const token = res?.token;
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('Token usado en la request:', token);

        }
        this.router.navigateByUrl('/dashboard');
        this.loginForm.reset();
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Error al iniciar sesión';
      }
    });
  }
}
