import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; 
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})
export class CreateAccount {
  createForm!: FormGroup;

   constructor(private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }

  get lastName(){
    return this.createForm.controls['lastName'];
  }

  get name(){
    return this.createForm.controls['name'];
  }

  get email(){
    return this.createForm.controls['email'];
  }

  get password(){
    return this.createForm.controls['password'];
  }

  register(){//valida que tenga datos los campos
    if(this.createForm.valid){
      console.log("Llamar al servicio de register");
      this.router.navigateByUrl('/dashboard') //ruta a la que se dirige el btn con la accion login()
      this.createForm.reset();
    }else{
      this.createForm.markAllAsTouched();
      alert("error al ingresar los datos");
    }
  }


}
