import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './routeApi';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiLocalUrl = environment.apiLocalUrl

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders().set('Accept', 'application/json');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getclient(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${id}`, { headers })
  }

    getclientNum(cliente: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${cliente}`, { headers })
  }

  getAuthenticatedUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/user`, { headers });
  }

  updateUser(id: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiLocalUrl}/usuarios/${id}`, data, { headers });
  }

}
