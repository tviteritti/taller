import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {Producto} from "../../producto";
import {ProductosService} from "../../SERVICES/productos.service";
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productoModel = new Producto("","","","","");
  email: string = '';
 

  constructor(private productosService: ProductosService,private router:Router,private route: ActivatedRoute) {  }
  alert:boolean=false;
  alertaNombre:boolean=false;
  alertaClasificacion:boolean=false;
  alertaDescripcion:boolean=false;
  alertaPrecio:boolean=false;
 
  public cargando = false;
  
  ngOnInit(): void {  }
  error = false;

  validateName = (name:string) => {
    return String(name)
      .toLowerCase()
      .match(
        /^(?=(?:^\w))([A-Za-z ]+)(?<=[^ ])$/
        );
        
  };

   validatePrice = (price:string) => {
    return String(price)
      .toLowerCase()
      .match(
        /^(?=(?:^\w))([0-9 ]+)(?<=[^ ])$/
        );
  }; 
  validationResult=(nombre: string, clasificacion: string, descripcion: string, precio: string)=> {
//    const respuesta = await productModel.insertar(producto.nombre,producto.clasificacion, producto.descripcion, producto.precio,producto.foto);
var errors = [];
var errorName= "El campo nombre no puede estar vacio y no puede contener caracteres especiales"
var errorClasificacion= "El campo clasificacion no puede estar vacio y no puede contener caracteres especiales"
var errorDescripcion= "El campo descripcion no puede estar vacio y no puede contener caracteres especiales(solo letras y números)"
var errorPrice= "El campo precio solo puede contener dígitos"

console.log("campo nombre " + nombre)
var i = 0;
if(!this.validateName(nombre) ){
  errors [i] = errorName;
  console.log(errors[i])
  i++;
}
if(!this.validateName(clasificacion) ){
  errors [i] = errorClasificacion;
  console.log(errors[i])
  i++;
}
if(!this.validateName(descripcion) ){
  errors [i] = errorDescripcion;
  console.log(errors[i])
  i++;
}
if(!this.validatePrice(precio) ){
  errors [i] = errorPrice;
  console.log(errors[i])
  i++;
}
return errors;
  }
   guardar() {
      
    var errors=[]=this.validationResult(this.productoModel.nombre,this.productoModel.clasificacion,this.productoModel.descripcion,this.productoModel.precio )


    try {
    if(errors.length==0){

  
      
      this.productosService.agregarProducto(this.productoModel);  
      this.alert=true;

      this.route.queryParams.subscribe(params => {
        this.email = params['user'];
 
    });
    this.router.navigate(["/home/"+this.email])
    }else{
      this.error = true;
      throw true;
    }
  }catch(error){
    var i=0;
    var termino = false;
    while(!termino){
    if(errors[i].length>0){
      alert(errors[i]= errors[i])
      i++;
      
    }else{
      termino = true;
    }
  }
  }
    }   
  
  volver() {
    this.route.queryParams.subscribe(params => {
        this.email = params['user'];
 
    });
    this.router.navigate(["/home/"+this.email])

}
    closeAlert(){
          this.alert=false
          this.alertaNombre=false
          this.alertaClasificacion=false
          this.alertaPrecio=false
        }

}