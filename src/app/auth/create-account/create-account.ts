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

   constructor(private fb: FormBuilder, private router:Router, private api: LoginS) {
    this.createForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }


  get name(){
    return this.createForm.controls['name'];
  }

    get lastName(){
    return this.createForm.controls['lastName'];
  }

  get email(){
    return this.createForm.controls['email'];
  }

  get password(){
    return this.createForm.controls['password'];
  }

  register(){
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }

    //Formulario
    const payload = {
      name: this.createForm.value.name,
      last_name: this.createForm.value.lastName,
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
