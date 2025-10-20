import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/user/clientService';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile {
  updateForm!: FormGroup;
  showPassword = false;
  loading = false;
  messageText = '';
  error = '';


  constructor(private fb: FormBuilder, private router: Router, private clientS: ClientService) {
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-ZÁÉÍÓÚÑáéíóúñ ]*')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-ZÁÉÍÓÚÑáéíóúñ ]*')]],
      email: ['', [Validators.required, Validators.email]],
      // contraseña opcional: dejar vacío para no cambiar
      password: ['', [Validators.minLength(8)]],
    });

    this.loadUserData();
  }

  get name() {
    return this.updateForm.controls['name']!;
  }

  get lastName() {
    return this.updateForm.controls['lastName']!;
  }

  get email() {
    return this.updateForm.controls['email']!;
  }

  get password() {
    return this.updateForm.controls['password']!;
  }


  loadUserData() {
    this.clientS.getAuthenticatedUser().subscribe({
      next: user => {
        const id = user.id;
        this.clientS.getclient(id).subscribe({
          next: (user) => {
            this.updateForm.patchValue({
              name: user.name ?? '',
              lastName: user.lastName ?? '',
              email: user.email ?? ''
            });
          },
          error: (err) => {
            console.log('Error al cargar datos del usuario', err);
            console.error(err);
          }
        });
      }
    });
  }



  update() {
    if (this.updateForm.invalid) { this.updateForm.markAllAsTouched(); return; }

    this.loading = true;
    const raw = this.updateForm.value;

    const payload: any = {
      name: raw.name,
      last_name: raw.lastName,
      email: raw.email
    };

    if (raw.password && raw.password.length >= 8) payload.password = raw.password;

    this.clientS.getAuthenticatedUser().subscribe({
      next: user => {
        const id = user.id;
        this.clientS.updateUser(id, payload as any).subscribe({
          next: (res) => {
            this.loading = false;
            console.log('Perfil actualizado', res);
            this.loadUserData();
            this.router.navigate(['/perfil']);
          },
          error: (e) => {
            this.loading = false;
            console.error('Error update:', e);
            console.log('response body:', e?.error);
            this.error = e?.error?.message ?? 'No se pudo crear la cuenta';
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
