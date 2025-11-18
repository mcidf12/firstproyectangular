import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class NavComponent {
  constructor(private auth: LoginS) { }

  @Output() linkClick = new EventEmitter<void>();


  logout() {
    this.auth.logoutAndRedirect();
  }
}
 