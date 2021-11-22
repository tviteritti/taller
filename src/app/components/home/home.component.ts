import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../SERVICES/venta.service';
import { ProductosService, IProducts } from '../../SERVICES/productos.service';
import {Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 productos:any = [];
  constructor(private ProductosService:ProductosService, private VentaService:VentaService,private router:Router) { }
 
  ngOnInit(): void {
    this.VentaService.obtener(1).subscribe(data => {   // data is already a JSON object
      this.productos = data;
      });
  }
  public total() {
    // Quién te conoce reduce
    let total = 0;
    this.productos.forEach((p: { precio: number; }) => total += p.precio);
    return total;
  }


   obtener():any {
     console.log("llegue component front")
     this.ProductosService.obtener().subscribe(data => {   // data is already a JSON object
       this.productos = data;
  });
  }
  obtenerJson(){
   console.log(this.productos);
  }
  
}
