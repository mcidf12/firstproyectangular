import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/user/clientService';
import { NgxSonnerToaster, toast } from "ngx-sonner";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink , NgIf, NgxSonnerToaster],
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
        const cliente = user.cliente;
        this.clientS.getclientApi(cliente).subscribe({
          next: res => this.data = res,
          error: err => toast.error("Error cliente")
        });
      },
      error: err => {
        toast.error("Error al obtener los datos", err);
      }
    });
  }

    contactSupport() {
    const phone = '7121748293';
    const text = encodeURIComponent('Hola, necesito ayuda.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }


}
