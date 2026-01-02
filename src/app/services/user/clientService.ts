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

  //obtener token de local o de sessionStorage
  private getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  //obtencion de headers
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = headers.set('x-web-key', 'web_9825f8agd35dfd4bg15fsd3a94c947a28896d5fd58gjh0f251a38912a');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  //peticiones para usuarios
  //Buscar por id url localhost
  getclient(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${id}`, { headers })
  }


  //Buscar por cliente url localhost
  getclientNum(cliente: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/usuarios/${cliente}`, { headers })
  }

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

  getCliente(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/user`, { headers });
  }

  //peticiones para servicios
  addService(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiLocalUrl}/servicio`, data, { headers });
  }

  //metodo index 
  getService(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiLocalUrl}/servicios`, { headers });
  }

  // servicios.service.ts
  getClientePorNumero(numero: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiLocalUrl}/cliente/${numero}`, { headers });
  }

  deleteService(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiLocalUrl}/servicio/${id}`, { headers });
  }

  verifyAccessService(cliente: string): Observable<{has_access: boolean, servicio?: any}>{
    const headers = this.getHeaders();
    return this.http.get<{has_access: boolean, servicio?: any}>(`${this.apiLocalUrl}/verify-access-service/${cliente}`, { headers });
  }



}
