import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from './loginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

//servicio crea un observable que escucha la api rest
export class LoginS {
  constructor(private http: HttpClient, private router: Router) { }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Accept', 'application/json');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  //Login post
  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    return this.http.post<any>('http://localhost:8000/api/auth/login', credentials);
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    //console.log('Token enviado (localStorage):', this.getToken());
    console.log('Headers que se enviarán:', headers.keys().map(k => `${k}: ${headers.get(k)}`));

    return this.http.get('http://localhost:8000/api/auth/logout', { headers });
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/usuarios', data);
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>('http://localhost:8000/api/usuarios', { headers });
  }

  updateUser(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>('http://localhost:8000/api/usuarios/update', data, { headers });
  }




  
  logoutAndRedirect() {
    this.logout().subscribe({
      next: () => {
        console.log('Logout exitoso');
        this.clearToken();
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        this.clearToken();
        this.router.navigate(['/iniciar-sesion']);
        if (err?.status !== 401) {
          console.error('Error en logout:', err);
        }
      }
    });
  }
}

