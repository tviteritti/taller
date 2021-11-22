import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = '/api/carrito';

  constructor(private http: HttpClient) { }

  public obtener(id: number) {
    return this.http.post(this.url,{id: id,});
  }
}
