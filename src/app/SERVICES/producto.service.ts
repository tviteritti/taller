import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Producto} from "../producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url= '/api/product';
  constructor(private http: HttpClient) { }

  

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