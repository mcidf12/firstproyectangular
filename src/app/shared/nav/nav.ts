import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginS } from '../../services/auth/login';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class NavComponent {
   constructor(private auth: LoginS) {}

  logout() {
    this.auth.logoutAndRedirect();
  }
  }
