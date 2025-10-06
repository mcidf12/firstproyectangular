import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from './loginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//servicio crea un observable que escucha la api rest
export class LoginS {

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token ?? ''}`)
      .set('Accept', 'application/json')
  }


  constructor(private http: HttpClient) {

  }

  //Login post
  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    return this.http.post<any>('http://localhost:8000/api/auth/login', credentials);
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    console.log('Token enviado (localStorage):', this.getToken());
    console.log('Headers que se enviarán:', headers.keys().map(k => `${k}: ${headers.get(k)}`));

    return this.http.post('http://localhost:8000/api/auth/logout', {}, { headers: this.getHeaders() });
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/usuarios', data);
  }


  getUser(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/usuarios')
  }

}
