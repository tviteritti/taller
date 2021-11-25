import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = '/api/obtenerIdcliente';
  url2 = '/api/registro';

  constructor(private http: HttpClient) { }

    public obtenerId(email: string) {
    return this.http.post(this.url,{email: email,});
  }
  public insertar(nombre: string, contraseña: string, apellido: string, direccion: string, email: string) {
      console.log("1")
    return this.http.post(this.url2,{nombre: nombre,contraseña: contraseña,apellido: apellido,direccion: direccion,email: email});
  }
}
