import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; 
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  //uso de formularios reactivos
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }


  login(){//valida que tenga datos los campos
    if(this.loginForm.valid){
      //console.log("Llamar al servicio de login");
      this.router.navigateByUrl('/dashboard') //ruta a la que se dirige el btn con la accion login()
      this.loginForm.reset();
    }else{
      this.loginForm.markAllAsTouched();
      alert("error al ingresar los datos");
    }
  }
}
