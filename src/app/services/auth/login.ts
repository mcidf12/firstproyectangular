import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//servicio crea un observable que escucha la api rest
export class LoginS {

  constructor(private http: HttpClient){

  }

  //Login post
  login(credentials:LoginRequest):Observable<any>{
    //console.log(credentials);
    return this.http.post<any>('http://localhost:8000/api/auth/login', credentials);
    //return this.http.get('././assets/data.json')
  }

  register(data:RegisterRequest):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/usuarios', data);
  }


  getUser(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8000/api/usuarios')
    }
  
}
