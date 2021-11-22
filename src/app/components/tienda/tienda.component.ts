
import {Component, OnInit} from '@angular/core';
import { ProductosService } from 'src/app/SERVICES/productos.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public productos:any = [];

  constructor(private productosService: ProductosService) {
  }

  async ngOnInit() {
   this.productos =  this.productosService.obtenerProductosConFotos();
  }

}
