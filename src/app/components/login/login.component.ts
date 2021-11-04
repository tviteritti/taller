import { Component, OnInit } from '@angular/core';
import { EquipoService, User } from '../../SERVICES/equipo.service'
import {Router } from '@angular/router';

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

  constructor(private EquipoService:EquipoService, private router:Router) { }


  ngOnInit(): void {
  }

  login(){
    this.EquipoService.login(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}

