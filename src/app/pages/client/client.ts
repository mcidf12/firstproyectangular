import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/user/clientService';


@Component({
  selector: 'app-client',
  imports: [ CurrencyPipe, NgIf, NgFor],
  templateUrl: './client.html',
  styleUrl: './client.css'
})

export class Client implements OnInit {
  data: any;
  showDetails = false;

  
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

  toggleDetails() { this.showDetails = !this.showDetails; }

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

    get latestPayments() {
    const list = this.data?.servicios?.estadoCuenta || [];
    // mostrar últimas 5 (o menos si no hay)
    return list.slice(0, 5);
  }


}
