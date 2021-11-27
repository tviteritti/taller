import { Component, OnInit } from '@angular/core';
import { User } from '../../SERVICES/login.service'
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { CookieService } from 'ngx-cookie-service';


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

  constructor(private router:Router, private cookieService: CookieService) { }

  alertaLogin:boolean=false;





  ngOnInit(): void {
  }



   async login(){
    try {

      var user = await Auth.signIn(this.user.email.toString(), this.user.password.toString());
      console.log('Email = ' + this.user.email + ' pass= ' + this.user.password);
      var tokens =  user.signInUserSession;
      var tokenDeRespuesta = user.signInUserSession.accessToken.jwtToken;
      console.log("token: " + user.signInUserSession.accessToken.jwtToken);
      if(tokens != null){
        this.cookieService.set('token_access', tokenDeRespuesta, 4, '/' );
        console.log('User authenticated');
        this.router.navigate(['home/'+this.user.email]);

      }
    }catch (error){
      this.alertaLogin=true;
    }
  }

  closeAlert(){
    this.alertaLogin = false;
  }

}

