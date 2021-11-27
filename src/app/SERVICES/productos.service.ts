import {Injectable} from '@angular/core';
import { Producto } from '../model/Producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = '/api/product';
  
  constructor(private http: HttpClient) { 
  }

  public async eliminarProducto(idProducto:any) {
    return await this.http.delete(this.url + "?id=".concat(idProducto));
  }


  public async agregarProducto(producto: Producto) {
    return await this.http.post(this.url, producto).toPromise();
  }

  public async obtenerProductos() {
    
    return await this.http.get(this.url);
  }

  public async obtenerProductosConFotos() {
    return await this.http.get("/productos_con_fotos");
  }

  public async obtenerProductoConFotosPorId(idProducto:any) {
    return await this.http.get(this.url + "?id=".concat(idProducto));
  }
 
  public obtener() {
  console.log("llegue a service front ")
  
    return this.http.get(this.url);
  }
}

export interface IProducts{
    id:string,
    nombre:string,
    descripcion:string,
    precio:string

}

