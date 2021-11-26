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
  productoModel = new Producto("","","","","remera_negra_lisa.jpg");
  email: string = '';
 

  constructor(private productosService: ProductosService,private router:Router,private route: ActivatedRoute) {  }
  alert:boolean=false;
  alertaNombre:boolean=false;
  alertaClasificacion:boolean=false;
  alertaDescripcion:boolean=false;
  alertaPrecio:boolean=false;
 
  public cargando = false;
  
  ngOnInit(): void {  }

   guardar() {
      
    if (!this.productoModel.nombre) {
       this.alertaNombre = true;
    }
    if (!this.productoModel.clasificacion) {
       this.alertaClasificacion = true;
    }
    if (!this.productoModel.descripcion) {
       this.alertaDescripcion = true;
    }
    if (!this.productoModel.precio) {
      this.alertaPrecio = true; 
    }




    else if ( this.productoModel.nombre && this.productoModel.clasificacion && this.productoModel.descripcion && this.productoModel.precio ){
      this.cargando = true;
   
      const idProductoGuardado= this.productosService.agregarProducto(this.productoModel);  

    
  
      this.cargando = false;
      this.alert=true;

      this.route.queryParams.subscribe(params => {
        this.email = params['user'];
 
    });
    this.router.navigate(["/home/"+this.email])
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