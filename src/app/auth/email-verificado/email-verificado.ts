import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-email-verificado',
  imports: [RouterLink, NgxSonnerToaster],
  templateUrl: './email-verificado.html',
  styleUrl: './email-verificado.css'
})
export class EmailVerificado implements OnInit {
  countdown: number = 5;

  constructor(private router: Router) { }

  ngOnInit(): void {
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(interval);
            this.router.navigate(['/iniciar-sesion']);
          }
        }, 1000);
  }
}
