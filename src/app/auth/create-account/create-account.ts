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
  loading = false;


  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {
    this.createForm = this.fb.group({
      numero_cliente: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^00\d{6}-[A-Z]$/i)]],
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


  get numero_cliente() { return this.createForm.controls['numero_cliente']; }
  get email() { return this.createForm.controls['email']; }
  get password() { return this.createForm.controls['password']; }
  get passwordConfirmation() { return this.createForm.controls['password_confirmation']; }



  register() {
    if (this.loading) return;

    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }

    this.loading = true;

    const raw = this.createForm.value;

    //normalizar numero de cliente
    const codigoNormalizado = raw.numero_cliente.trim().toUpperCase();

    const payload1: any = {
      numero_cliente: codigoNormalizado,
      email: raw.email,
      password: raw.password,
      password_confirmation: raw.password_confirmation
    };

    this.api.register(payload1 as any).subscribe({
      next: () => {
        toast.success('Cuenta creada. Revisa tu correo para validar tu cuenta');
        this.createForm.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/iniciar-sesion');
        }, 2000);
        //
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        if (e?.status === 0) {
          toast.error('No se pudo conectar al servido')
        } else if (e?.status === 409) {
          toast.error('Este cliente ya tiene una cuenta registrada')
        } else if (e?.status === 422) {
          toast.error('Este correo ya tiene una cuenta registrada')
        } else if (e?.status === 403) {
          toast.error('Este numero de cliente ha sido dado de baja')
        }else if (e?.status === 404) {
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
