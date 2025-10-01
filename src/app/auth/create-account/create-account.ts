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
  loginForm!: FormGroup;

   constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      name: [' ',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get name(){
    return this.loginForm.controls['name'];
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  register(){//valida que tenga datos los campos
    if(this.loginForm.valid){
      console.log("Llamar al servicio de register");
      this.router.navigateByUrl('/dashboard') //ruta a la que se dirige el btn con la accion login()
      this.loginForm.reset();
    }else{
      this.loginForm.markAllAsTouched();
      alert("error al ingresar los datos");
    }
  }


}
