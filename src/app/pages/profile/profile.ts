import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';

import { ClientService } from '../../services/user/clientService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavComponent,NgIf],
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
