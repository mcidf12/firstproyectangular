import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; 
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './recover.html',
  styleUrl: './recover.css'
})
export class Recover {
  recoverForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.recoverForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }

  get email(){
    return this.recoverForm.controls['email'];
  }

}
