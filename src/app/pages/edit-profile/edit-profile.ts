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
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadUserData();
  }

  get name() { return this.updateForm.controls['name']!; }
  get lastName() { return this.updateForm.controls['lastName']!; }
  get phone() { return this.updateForm.controls['phone']!; }
  get email() { return this.updateForm.controls['email']!; }


  loadUserData() {

    this.clientS.getAuthenticatedUser().subscribe({
      next: user => {
        const cliente = user.cliente;
          this.clientS.getclientNum(cliente).subscribe({
          next: (userData) => {
            this.updateForm.patchValue({
              name: userData.cliente.name ?? '',
              lastName: userData.cliente.last_name ?? '',
              phone: userData.cliente.telefono ?? '',
              email: userData.cliente.correo ?? ''
            });
            console.log(userData)
          },
          error: (err) => {
            console.error('Error al cargar datos del usuario', err);
          }
        });
      },
      error: err => console.error('No se pudo obtener usuario autenticado', err)
    });
  }



  update() {
    if (this.updateForm.invalid) { this.updateForm.markAllAsTouched(); return; }

    this.loading = true;
    const raw = this.updateForm.value;

    const payload: any = {
      name: raw.name,
      last_name: raw.lastName,
      phone: raw.phone,
      email: raw.email
    };

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
  cancel() {
    this.router.navigate(['/perfil']);
  }
}
