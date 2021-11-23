import { Component, OnInit } from '@angular/core';
import { RegisterService, IRegister } from '../../SERVICES/register.service'
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
      password:""
  }
  constructor(private RegisterService:RegisterService, private router:Router) { }

  alertaRegistro:boolean=false;


  submit(){

  }
  ngOnInit(): void {
  }
  registerPost(){
    try {
      var user = Auth.signUp({
        username: this.register.username,
        password: this.register.password,
        attributes: {
          email: this.register.email
        }
      });
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
