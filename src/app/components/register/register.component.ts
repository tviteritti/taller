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


  submit(){

  }
  ngOnInit(): void {
  }
  registerPost(){

      var user = Auth.signUp({
        username: this.register.username,
        password: this.register.password,
        attributes: {
          email: this.register.email
        }
      });
      this.ClienteService.insertar(this.register.nombre, this.register.password, this.register.apellido, this.register.direccion, this.register.email).subscribe(data => { });
      console.log({user});
      this.router.navigate(['login']);
      user.catch((data)=>{
          alert(data)
      });
  }

  closeAlert(){
    this.alertaRegistro = false;
  }


}
