import {Injectable} from '@angular/core';
import { Producto } from '../model/Producto';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = '/api/product';
  
  constructor(private http: HttpClient) { //antes estava el service
  }

  public async eliminarProducto(idProducto:any) {
    return await this.http.delete("/product?id=".concat(idProducto));
  }


  public  agregarProducto(producto: Producto) {
    return this.http.post(this.url,producto);
  }
  /*
  El formdata debe tener el id del producto
   
  public async agregarFotosDeProducto(fotos: FormData) { //no compila por el httpClient
    return await this.http.formdata("/fotos_producto", fotos);
  }
*/
  public async obtenerProductos() {
    return await this.http.get("/product");
  }

  public async obtenerProductosConFotos() {
    return await this.http.get("/productos_con_fotos");
  }

  public async obtenerProductoConFotosPorId(idProducto:any) {
    return await this.http.get("/product?id=".concat(idProducto));
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

