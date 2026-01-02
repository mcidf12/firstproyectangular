import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';

import { ClientService } from '../../services/user/clientService';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [NgIf, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  error = '';

  data: any;
  loading = false;
  private subs: Subscription[] = [];

  constructor(private clientS: ClientService, private route: ActivatedRoute, private router: Router) { }

  /*ngOnInit(): void {
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
  }*/

  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe(params => {
      const numero = params.get('numero_cliente');
      if (numero) {
        this.loadClientData(numero);
      } else {
        const userSub = this.clientS.getAuthenticatedUser().subscribe({
          next: user => {
            const cliente = user?.cliente;
            if (!cliente) {
              toast.error('No se encontro infomarcion')
              return;
            }
            this.loadClientData(cliente);
          },
          error: err => {
            console.error('Error obteniendo usuario autenticado', err);
            toast.error('Error al obtener los datos del usuario');
          }
        });
        this.subs.push(userSub);
      }
    });
    this.subs.push(sub);

  }

  loadClientData(numeroCliente: string) {
    this.loading = true;
    this.data = null;

    const sub = this.clientS.getClientePorNumero(numeroCliente).subscribe({
      next: res => {
        //console.log(res);
        this.data = {
          servicio: res.servicio,
          cliente: res.cliente?.cliente,
          servicios: res.cliente?.servicios,
          numero_cliente: res.numero_cliente
        };
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        console.error('Error en servicio', e);
        if (e?.status === 0) {
          toast.error('No se pudo conectar al servidor');
        } else if (e?.status === 404) {
          toast.error('Servicio no encontrado');
        } else if (e?.status === 401) {
          toast.error('No autorizado');
          this.router.navigateByUrl('/iniciar-sesion');
        } else if (e?.status === 403) {
          toast.error('No autorizado para eliminar este servicio');
        } else {
          toast.error('Error inesperado');
        }
      }

    })

  }

}
