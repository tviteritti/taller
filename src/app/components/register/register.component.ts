import { Component, OnInit } from '@angular/core';
import { RegisterService, IRegister } from '../../SERVICES/register.service'
import { ClienteService } from '../../SERVICES/cliente.service'
import {Router } from '@angular/router';
import Auth from '@aws-amplify/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: IRegister={
      username:"",
      email:"",
      password:"",
      nombre:"",
      direccion:"",
      apellido:""
  }
  constructor(private RegisterService:RegisterService,private ClienteService:ClienteService, private router:Router) { }

  alertaRegistro:boolean=false;

  validateUserNameEqualsEmail(){
    if (this.register.username.toLowerCase() !== this.register.email.toLowerCase()) {
      return true;
    }else{
      return false;
    }
  }


  submit(){

  }
  ngOnInit(): void {
  }
  registerPost(){
    try {
      if (this.validateUserNameEqualsEmail()) {
        alert("el nombre de usuario debe ser igual al email")
        return;
      }

      var user = Auth.signUp({
        username: this.register.email,
        password: this.register.password,
        attributes: {
          email: this.register.email
        }
      });
      this.ClienteService.insertar(this.register.nombre, this.register.password, this.register.apellido, this.register.direccion, this.register.email).subscribe(data => { });
      console.log({user});
      this.router.navigate(['login']);
    } catch (error) {
      this.alertaRegistro = true;
    }
  }

  closeAlert(){
    this.alertaRegistro = false;
  }


}
