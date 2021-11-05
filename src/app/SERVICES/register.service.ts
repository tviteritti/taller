import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url= '/api/register';
  constructor(private http: HttpClient) { }

  register(register:IRegister) {
      console.log("pase por aca");
    return this.http.post(this.url,register);
  }
 
}
export interface IRegister{
  username: string;
  email: string;
  password: string;
}