import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';

import { ClientService } from '../../services/user/clientService';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NgIf, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
    error = '';
  
    data: any;
  
    constructor(private clientS: ClientService) { }
  
    ngOnInit(): void {
      this, this.clientS.getAuthenticatedUser().subscribe({
        next: user => {
          const cliente = user.cliente;
          this.clientS.getclientApi(cliente).subscribe({
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
 