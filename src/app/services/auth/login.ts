import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, RecoverRequest } from './loginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../user/routeApi';

@Injectable({
  providedIn: 'root'
})

//servicio crea un observable que escucha la api rest
export class LoginS {

  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = environment.apiUrl

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
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    //console.log('Token enviado (localStorage):', this.getToken());
    console.log('Headers que se enviarán:', headers.keys().map(k => `${k}: ${headers.get(k)}`));

    return this.http.get(`${this.apiUrl}/auth/logout`, { headers });
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, data);
  }

  sendPasswordReset(data: RecoverRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/recoverPassword`,data);
  }
  sendPasswordUpdate(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/auth/updatePassword`,data);
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

