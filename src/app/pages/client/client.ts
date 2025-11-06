import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';
import { CurrencyPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/user/clientService';


@Component({
  selector: 'app-client',
  imports: [NavComponent, CurrencyPipe, NgIf, ],
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

  calcularTotalMensual(servicios: any): number {

    if (!servicios) return 0;
    let total = 0;

    if (servicios.internet && servicios.internet.precio) {
      total += Number(servicios.internet.precio);
    }

    if (servicios.camaras && servicios.camaras.precio) {
      const precio = Number(servicios.camaras.precio) || 0;
      const noCamaras = Number(servicios.camaras.canServicios) || 0;
      total += precio * noCamaras;
    }

    if (servicios.telefonia) {
      const precio = Number(servicios.telefonia.precio) || 0;
      const lineas = Number(servicios.telefonia.lineas) || 0;
      total += precio * lineas;
    }

    return total;
  }


}
