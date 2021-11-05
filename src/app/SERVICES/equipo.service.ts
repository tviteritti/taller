import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url= '/api/login';
  constructor(private http: HttpClient) { }

  login(user:User) {
    return this.http.post(this.url, user);
  }
}

export interface User{
  username: string;
  email: string;
  password: string;
}