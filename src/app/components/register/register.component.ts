import { Component, OnInit } from '@angular/core';
import { RegisterService, IRegister } from '../../SERVICES/register.service'
import {Router } from '@angular/router';

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
    this.RegisterService.register(this.register).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
