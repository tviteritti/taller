import { environment } from 'src/environments/environment';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { CarritoService } from 'src/app/SERVICES/carrito.service';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto: any;

  constructor(private router: Router, private serviceCarrito: CarritoService) {
  }

  ngOnInit(): void {
  }

  public resolverRuta() {
    const baseUrl = environment.baseUrl;
    return `../../../fotos_productos/${this.producto.foto}`;
  }

  public agregarACarrito(id:number) {
    console.log('agregar al carrito');
    this.serviceCarrito.agregarAlCarrito(id);
  }

}
