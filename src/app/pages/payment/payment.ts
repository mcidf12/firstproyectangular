import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav';
import { ClipboardModule } from 'ngx-clipboard';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [NavComponent, ClipboardModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  mensajeCopiado: boolean = false;

  copy(dato: string) {
    navigator.clipboard.writeText(dato)
      .then(() => {
        this.mensajeCopiado = true;
        setTimeout(() => this.mensajeCopiado = false, 2000); // Oculta el mensaje en 2s
      })
      .catch(err => {
        console.error('Error al copiar:', err);
      });
  }

  contactSupport() {
    const phone = '7121748293';
    const text = encodeURIComponent('Hola, necesito ayuda con mi pago.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }

}
