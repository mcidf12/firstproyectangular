import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/user/clientService';
import { LoginS } from '../../services/auth/login';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './recover.html',
  styleUrl: './recover.css'
})
export class Recover {
  recoverForm!: FormGroup;
  loading = false;
  error = '';

  

  constructor(private fb: FormBuilder, private router: Router, private api: LoginS) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get email() {
    return this.recoverForm.controls['email'];
  }

  recover() {
    if (this.recoverForm.invalid) { this.recoverForm.markAllAsTouched(); return; }

    this.loading = true;
    const raw = this.recoverForm.value;

    const payload: any = {
      email: raw.email
    };

    this.api.sendPasswordReset(payload as any).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.message ?? 'No se pudo enviar el correo';
      }
    });  
  }

}
