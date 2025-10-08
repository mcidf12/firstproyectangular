import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { LoginS } from '../../services/auth/login';
import { NavComponent } from '../../shared/nav/nav';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NavComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  isLogin = false;
  username = 'Marcos'
  error = '';
}
