import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env, environment } from './routeApi';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiLocalUrl = environment.apiLocalUrl
  private apiUrl = env.apiUrl

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = headers.set('x-web-key','web_9825f8agd35dfd4bg15fsd3a94c947a28896d5fd58gjh0f251a38912a');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  /*
  *Buscar por id url localhost
  */
  getclient(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${id}`, { headers })
  }

  /*
  *Buscar por cliente url localhost
  */
  getclientNum(cliente: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${cliente}`, { headers })
  }

  /*
  *API REST  https://dev.emenet.mx/api/clientesV2/05228
  */

  getclientApi(cliente: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/clientesV2/${cliente}`, { headers })
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
