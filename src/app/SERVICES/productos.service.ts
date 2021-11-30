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

  public  eliminarProducto(idProducto:any) {
    return  this.http.delete(this.url + "?id=".concat(idProducto));
  }


  public  agregarProducto(producto: Producto) {
    return  this.http.post(this.url, producto).toPromise();
  }

  public  obtenerProductos() {
    
    return  this.http.get(this.url);
  }

  public  obtenerProductosConFotos() {
    return  this.http.get("/productos_con_fotos");
  }

  public  obtenerProductoConFotosPorId(idProducto:any) {
    return  this.http.get(this.url + "?id=".concat(idProducto));
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

