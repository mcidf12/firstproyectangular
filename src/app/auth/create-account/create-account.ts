import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';



@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})


export class CreateAccount {
  createForm!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {
    this.createForm = this.fb.group({
      cliente: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }


  get cliente() {
    return this.createForm.controls['cliente'];
  }

  get email() {
    return this.createForm.controls['email'];
  }

  get password() {
    return this.createForm.controls['password'];
  }

  register() {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }

    //Formulario
    const payload = {
      cliente: this.createForm.value.cliente,
      email: this.createForm.value.email,
      password: this.createForm.value.password,

    };

    this.api.register(payload as any).subscribe({
      next: () => {
        this.router.navigateByUrl('/iniciar-sesion');
        this.createForm.reset();
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'No se pudo crear la cuenta';
      }
    });
  }

}
