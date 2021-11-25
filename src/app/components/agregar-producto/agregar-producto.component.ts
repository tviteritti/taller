
import {Component, OnInit} from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {Producto} from "../../producto";
import {ProductosService} from "../../SERVICES/productos.service";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productoModel = new Producto("","","","","remera_negra_lisa.jpg");
 

  constructor(private productosService: ProductosService) {  }
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
      // Guardamos producto
      console.log(this.productoModel)
      const idProductoGuardado= this.productosService.agregarProducto(this.productoModel);  
      // Y luego las fotos
      //const fd = new FormData();  
      //fd.append("idProducto", idProductoGuardado);
    
  
      this.cargando = false;
      //this.productoModel = new Producto("", "","","","");  
      this.alert=true;

    }   
    
  }

    closeAlert(){
          this.alert=false
          this.alertaNombre=false
          this.alertaClasificacion=false
          this.alertaPrecio=false
        }

}
