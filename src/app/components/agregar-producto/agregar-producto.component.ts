
import {Component, OnInit} from '@angular/core';
import {Producto} from "../../producto";
import {ProductosService} from "../../SERVICES/productos.service";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productoModel = new Producto("", "","","");


  constructor(private productosService: ProductosService) {
  }

  public cargando = false;

   guardar() {
    if (!this.productoModel.nombre) {
      return alert("Escribe un nombre");
    }
    if (!this.productoModel.clasificacion) {
      return alert("Escribe la clasificacion");
    }
    if (!this.productoModel.descripcion) {
      return alert("Escribe la descripción");
    }
    if (!this.productoModel.precio) {
      return alert("Escribe el precio");
    }
  
    this.cargando = true;
    // Guardamos producto
    console.log(this.productoModel)
    const idProductoGuardado= this.productosService.agregarProducto(this.productoModel);

    // Y luego las fotos
    //const fd = new FormData();

    //fd.append("idProducto", idProductoGuardado);
  

    this.cargando = false;
    //this.productoModel = new Producto("", "","","","");
  }

  ngOnInit(): void {


  }

}
