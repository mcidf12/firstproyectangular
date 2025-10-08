import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient){}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders().set('Accept', 'application/json');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getclient(id: string): Observable<any> {
    const headers = this.getHeaders();
      return this.http.get<any>(`http://localhost:8000/api/usuarios/${id}`, {headers})
    }

  getAuthenticatedUser(): Observable<any> {
  const headers = this.getHeaders();
  return this.http.get<any>('http://localhost:8000/api/user', { headers });
}
  
}
