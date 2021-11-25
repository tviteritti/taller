import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = '/api/carritoCompra'; 
  url2 = '/api/obtenerIdvent';
  url3 = '/api/terminarCompra';

  constructor(private http: HttpClient) { }

  public obtener(id: number) {
    return this.http.post(this.url,{id: id,});
  }
  public obtenerIdVenta(id: number) {
    return this.http.post(this.url2,{id: id,});
  }
  public terminarCompra(idVenta: number) {
    return this.http.post(this.url3,{idV: idVenta,});
  }
}
