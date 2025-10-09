import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';
import { CurrencyPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/user/clientService';


@Component({
  selector: 'app-client',
  imports: [NavComponent, CurrencyPipe, NgIf],
  templateUrl: './client.html',
  styleUrl: './client.css'
})

export class Client implements OnInit {
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
