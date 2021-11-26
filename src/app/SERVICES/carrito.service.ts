import { HttpClient } from '@angular/common/http';

import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpService, private httpClient:HttpClient) {
  }

  public quitarProducto(idVenta:number,idProducto: number) {
    return this.httpClient.post("/api/carrito/eliminar", {
      idV: idVenta,
      idP: idProducto,
    });
  }

  public agregarAlCarrito(idVenta:number,idProducto: number) {
    return this.httpClient.post("/api/carrito/agregar", {
      idV: idVenta,
      idP: idProducto,
    });
  }

  public async existeEnCarrito(idProducto: number) {
    return await this.http.post("/carrito/existe", {
      id: idProducto,
    });
  }

  async obtenerProductos() {
    return await this.http.get("/carrito");
  }

  async terminarCompra(datosCliente: any) {
    return await this.http.post("/compra", datosCliente);
  }
}
