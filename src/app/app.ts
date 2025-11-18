import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav/nav';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NavComponent, Footer, Header, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Marcos');

  sidebarOpen = false;
  showSidebar = true;

  hiddenSidebarRoutes = [
    '/iniciar-sesion',
    '/crear-cuenta',
    '/recuperar-password',
    '/response-password',
    '/edit-perfil',
    '/edit-password',
    '/404'
  ];

  constructor(private router: Router) {
    // Detectar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkSidebar(event.url);
      });
  }

  checkSidebar(url: string) {
    // si la ruta está en la lista, ocultamos el sidebar
    this.showSidebar = !this.hiddenSidebarRoutes.includes(url);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
