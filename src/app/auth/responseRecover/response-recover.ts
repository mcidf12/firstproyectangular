import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginS } from '../../services/auth/login';

@Component({
  selector: 'app-response-recover',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './response-recover.html',
  styleUrl: './response-recover.css'
})
export class ResponseRecover {
  recoverForm!: FormGroup;
  showPassword = false;
  loading = false;
  error = '';

  token: string | null = null;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private api: LoginS) {

  }

  ngOnInit(): void {
    this.recoverForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    }, { Validators: this.passwordMatchValidator });

    this.route.queryParamMap.subscribe(q => this.token = q.get('token'));
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return pass === confirm ? null : { passwordMissMatch: true };
  }

  get password() {
    return this.recoverForm.controls['password']!;
  }

  get passwordConfirmation() {
    return this.recoverForm.controls['password_confirmation']!;
  }

  recoverPassword() {
    if (this.recoverForm.invalid) { this.recoverForm.markAllAsTouched(); return; }
    if (!this.token) { this.error = 'Token no encontrado en la URL'; return; }

    this.loading = true;
    const raw = this.recoverForm.value;

    const payload: any = {
      token: this.token,
      password: raw.password,
      password_confirmation: raw.password_confirmation
    };

    this.api.sendPasswordUpdate(payload as any).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.message ?? 'No se pudo actualizar la contraseña';
      }
    });
  }


  viewPassword() {
    this.showPassword = !this.showPassword;
  }


  cancel() {
    this.router.navigate(['/iniciar-sesion']);
  }


}
