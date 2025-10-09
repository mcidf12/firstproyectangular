import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { ClientService } from '../../services/user/clientService';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banca',
  imports: [NavComponent, CurrencyPipe, NgIf, NgFor, RouterLink],
  templateUrl: './banca.html',
  styleUrl: './banca.css'
})
export class Banca {
  data: any;
  
    constructor(private clientS: ClientService) { }
  
    ngOnInit(): void {
      //this.clientS.getclient('1').subscribe({
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
