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
  submit(){

  }
  ngOnInit(): void {
  }
  registerPost(){
    try {
      const user = Auth.signUp({
        username: this.register.username,
        password: this.register.password,
        attributes: {
          email: this.register.email
        }
      });
      console.log({user});
      alert('User signup, verify email')
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error)
    }
  }
}
