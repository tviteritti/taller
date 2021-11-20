
import { Component, OnInit } from '@angular/core';
import { ProductoService, IProducts } from '../../SERVICES/producto.service'
import {Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
 products:any = [];
  constructor(private ProductoService:ProductoService, private router:Router) { }
 
  ngOnInit(): void {
  }


   obtener():any {
     console.log("llegue component front")
     this.products= this.ProductoService.obtener().subscribe(data => {   // data is already a JSON object
      console.log(data);
      this.obtenerJson(data)
      return JSON.stringify(data);
  });
    console.log(this.products);
  }
  obtenerJson(products:any){
   console.log(products);
  }
  
}
