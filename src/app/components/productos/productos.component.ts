import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { ProductosService } from 'src/app/SERVICES/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos = [];
  public columnas = ['nombre', 'descripcion', 'precio', 'eliminar'];

  constructor(private router: Router, private productosService: ProductosService) {
  }

  async eliminar(producto:number) {
    if (!confirm("¿Realmente lo quieres eliminar<?")) {
      return;
    }
    await this.productosService.eliminarProducto(producto);
    await this.obtenerProductos();
  }

  async ngOnInit() {
    await this.obtenerProductos();
  }

  async obtenerProductos() {
    await this.productosService.obtenerProductos();
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/productos/agregar");
  }

}
