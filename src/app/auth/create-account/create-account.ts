import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';
import { toast, NgxSonnerToaster } from 'ngx-sonner';



@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgxSonnerToaster],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})


export class CreateAccount {
  createForm!: FormGroup;
  error = ('');
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {
    this.createForm = this.fb.group({
      cliente: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    if (pass && confirm && pass !== confirm) {
    return { passwordMissMatch: true };
  }
  return null;
  }


  get cliente() { return this.createForm.controls['cliente']; }

  get email() { return this.createForm.controls['email']; }

  get password() { return this.createForm.controls['password']; }

  get passwordConfirmation() { return this.createForm.controls['password_confirmation']; }



  register() {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }

    const raw = this.createForm.value;

    const payload1: any = {
      cliente: raw.cliente,
      email: raw.email,
      password: raw.password,
      password_confirmation: raw.password_confirmation
    };

    this.api.register(payload1 as any).subscribe({
      next: () => {
        toast.success('Cuenta creada. Revisa tu correo para validar tu cuenta');
        setTimeout(() => {
          this.router.navigateByUrl('/iniciar-sesion');
        }, 2000);
        this.createForm.reset();
      },
      error: (e) => {
        if (e?.status === 0) {
          toast.error('No se pudo conectar al servido')
        } else if (e?.status === 409) {
          toast.error('Este cliente ya tiene una cuenta registrada')
        } else if (e?.status === 422) {
          toast.error('Este correo ya tiene una cuenta registrada')
        } else if (e?.status === 404) {
          toast.error('Cliente no encontrado')
        } else {
          toast.error('Error')
        }
      }
    });
  }


  viewPassword() {
    this.showPassword = !this.showPassword;
  }

}
