import { Component, OnInit } from '@angular/core';
import { RegisterService, IRegister } from '../../SERVICES/register.service'
import { ClienteService } from '../../SERVICES/cliente.service'
import {Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
var passwordValidator = require('password-validator');


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordValidator=passwordValidator;
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

  /*validateUserNameEqualsEmail(){
    if (this.register.username.toLowerCase() !== this.register.email.toLowerCase()) {
      return true;
    }else{
      return false;
    }
  }*/

   validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
   validateName = (name:string) => {
    return String(name)
      .toLowerCase()
      .match(
        /^(?=(?:^\w))([A-Za-z ]+)(?<=[^ ])$/
        );
  };
  validateLastName = (apellido:string) => {
    return String(apellido)
      .toLowerCase()
      .match(
        /^(?=(?:^\w))([A-Za-z ]+)(?<=[^ ])$/
        );
  };
  validateAddress = (direccion:string) => {
    return String(direccion)
      .toLowerCase()
      .match(
        
        /^(?=(?:^\w))([A-Za-z0-9 ]+)(?<=[^ ])$/    );
  };
  validatePass = (pass:string) => {
    var schema = new passwordValidator();
  
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()
    .has().symbols()                          
    return schema.validate(pass)
   
  
   
  }
  validationResult = (nombre: string, contraseña: string, apellido: string, direccion: string, email: string) => {
    var errors = [];
    var errorUsername = "Cambiar username tiene que ser un mail valido "
    var errorEmail = "Email tiene que ser un mail valido "
    var errorPassword= "Error en la contraseña debe contener 1 dígito, 1 letra mayúscula, 1 letra minúscula, 1 caracter especial y el tamaño debe ser mayor a 8"
    var errorName= "El campo nombre no puede estar vacio y no puede contener caracteres especiales"
    var errorLastName= "El campo apellido no puede estar vacio y no puede contener caracteres especiales"
    var errorAddress= "El campo direccion no puede estar vacio y no puede contener caracteres especiales(solo letras y números)"
    
    var i = 0;
    if(!this.validateEmail(email)){
    
      errors[i]= errorEmail;
      console.log(errors[i])
      i++;
    }
    /*if(!this.validateEmail(username)){
  
      errors[i]= errorUsername;
      console.log(errors [i])
      i++;
  
    }*/
    if(!this.validatePass(contraseña)){
   
      errors [i] = errorPassword;
      console.log(errors[i])
      i++;
      }
    if(!this.validateName(nombre)){
      console.log("Pase por validacion de name ")
      errors [i] = errorName;
      console.log(errors[i])
      i++;
    }
    if(!this.validateLastName(apellido)){
      console.log("Pase por validacion de apellido ")
      errors [i] = errorLastName;
      console.log(errors[i])
      i++;
    }
    if(!this.validateAddress(direccion)){
      errors [i] = errorAddress;
      console.log(errors[i])
      i++;
    }
    
    return errors;
  }
  
  submit(){

  }
  ngOnInit(): void {
  }
  error = false;
  registerPost(){
    var errors=[]=this.validationResult(this.register.nombre, this.register.password, this.register.apellido, this.register.direccion, this.register.email)

    try {


      if(errors.length==0){
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
     /*  user.catch((data)=>{
        alert(data)
      }) */
    }else{
 
      throw true;

          }
   } catch (error) {
      this.alertaRegistro = true;
      var i=0;
      var termino = false;
      while(!termino){
      if(errors[i].length>0){
        alert(errors[i]= errors[i] + "/n")
        i++;
        
      }else{
        termino = true;
      }
    }
    }
  }
 
  closeAlert(){
    this.alertaRegistro = false;
  }


}
