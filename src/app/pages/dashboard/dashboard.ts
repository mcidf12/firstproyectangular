import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NavComponent } from '../../shared/nav/nav';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/user/clientService';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NavComponent, NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  isLogin = false;
  username = 'Marcos'
  error = '';

  data: any;

  constructor(private clientS: ClientService) { }

  ngOnInit(): void {
    this, this.clientS.getAuthenticatedUser().subscribe({
      next: user => {
        const id = user.id;
        this.clientS.getclient(id).subscribe({
          next: res => this.data = res,
          error: err => console.log("Error cliente", err)
        });
      },
      error: err => {
        console.log("Error al obtener los datos", err);
      }
    });
  }
}
