import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = '/api/obteberIdcliente';

  constructor(private http: HttpClient) { }

    public obtenerId(email: string) {
    return this.http.post(this.url,{email: email,});
  }
}
