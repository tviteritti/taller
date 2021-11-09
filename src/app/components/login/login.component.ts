import { Component, OnInit } from '@angular/core';
import { User } from '../../SERVICES/equipo.service'
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    username: "",
    email: "",
    password: ""
  };

  constructor(private router:Router) { }


  ngOnInit(): void {
  }

   async login(){
    try {
      var user = await Auth.signIn(this.user.email.toString(), this.user.password.toString());
      console.log('Email = ' + this.user.email + ' pass= ' + this.user.password);
      var tokens =  user.signInUserSession;
      if(tokens != null){
        console.log('User authenticated');
        this.router.navigate(['home']);
      }
    }catch (error){
      alert(error);
    }
  }

}

