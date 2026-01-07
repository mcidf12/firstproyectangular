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

  headerOpen = false;
  showheader = true;

  hiddenSidebarRoutes = [
    '/iniciar-sesion',
    '/crear-cuenta',
    '/recuperar-password',
    '/response-password',
    '/edit-perfil',
    '/edit-password',
    '/email-verificado',
    '/servicios',
    '/404', 
    '/'
  ];

  constructor(private router: Router) {
    //pagina de iniciar sesion sin sidebar
    this.checkSidebar(window.location.pathname);
    this.checkheader(window.location.pathname);

    // Detectar cambios de ruta 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const rawUrl = (event as NavigationEnd).urlAfterRedirects ?? (event as NavigationEnd).url;
        this.checkSidebar(rawUrl);
        this.checkheader(rawUrl);

      });
  }

  checkSidebar(url: string) {
    // proteger contra valores nulos/indefinidos
    if (!url) {
      this.showSidebar = true;
      return;
    }
    // cortar todo lo que venga despues de '?'
    const cleanUrl = url.split('?')[0];

    // validar exactamente contra la lista
    this.showSidebar = !this.hiddenSidebarRoutes.includes(cleanUrl);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  checkheader(url: string) {
    // proteger contra valores nulos/indefinidos
    if (!url) {
      this.showheader = true;
      return;
    }
    // cortar todo lo que venga despues de '?'
    const cleanUrl = url.split('?')[0];

    // validar exactamente contra la lista
    this.showheader = !this.hiddenSidebarRoutes.includes(cleanUrl);
  }

  toggleheader() {
    this.headerOpen = !this.headerOpen;
  }

  closeheader() {
    this.headerOpen = false;
  }
}
