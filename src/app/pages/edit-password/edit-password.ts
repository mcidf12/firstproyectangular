import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/user/clientService';

@Component({
  selector: 'app-edit-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-password.html',
  styleUrl: './edit-password.css'
})
export class EditPassword {
  updatePasswordForm!: FormGroup;
  showPassword = false;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private router: Router, private clientS: ClientService) {
  }

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      password: ['', [Validators.minLength(8)]],
    });
  }

  get password() {
    return this.updatePasswordForm.controls['password']!;
  }

  update() {
    if (this.updatePasswordForm.invalid) { this.updatePasswordForm.markAllAsTouched(); return; }

    this.loading = true;
    const raw = this.updatePasswordForm.value;

    const payload: any = {};
    if (raw.password && raw.password.length >= 8) {
      payload.password = raw.password;
    } else {
      // Si el campo está vacío, no enviamos nada
      this.loading = false;
      this.error = 'Ingresa una contraseña de al menos 8 caracteres';
      return;
    }

    this.clientS.getAuthenticatedUser().subscribe({
      next: user => {
        const id = user.id;
        this.clientS.updateUser(id, payload as any).subscribe({
          next: (res) => {
            this.loading = false;
            console.log('Contraseña actualizado', res);
            this.router.navigate(['/perfil']);
          },
          error: (e) => {
            this.loading = false;
            console.error('Error update:', e);
            this.error = e?.error?.message ?? 'No se pudo actualziar la cuenta';
          }
        });
      },
      error: err => {
        this.loading = false;
        console.error('No se pudo obtener usuarios', err);
      }
    });
  }

  viewPassword() {
    this.showPassword = !this.showPassword;
  }


  cancel() {
    this.router.navigate(['/perfil']);
  }

}
