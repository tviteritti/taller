import {  Component, OnInit } from '@angular/core';
import { VentaService } from '../../SERVICES/venta.service';
import { ProductosService } from '../../SERVICES/productos.service';
import { ClienteService } from '../../SERVICES/cliente.service';
import {Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {


  productos: any = [];
  carrito: any = [];
  email: string = '';
  idCliente: any = 0;
  idVenta: any = 0;

  constructor(private ProductosService:ProductosService, private VentaService:VentaService, private ClienteService:ClienteService,private router:Router,private route: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.ProductosService.obtener().subscribe(data => {
      this.productos = data;
    });

    this.email = this.route.snapshot.params['email'];

    this.ClienteService.obtenerId(this.email).subscribe(data => {
      this.idCliente = data;
      this.idCliente = this.idCliente.id;

      if(this.idCliente!= null) {
        this.VentaService.obtenerIdVenta(this.idCliente).subscribe(data => {
          this.idVenta = data;
          this.idVenta = this.idVenta.id;
          if (this.idVenta != null) {
            this.VentaService.obtener(this.idVenta).subscribe(data => {
              this.carrito = data;
            });
          }
        })
      }
    });
  }



  public total() {

    let total = 0;
    this.carrito.forEach((p: { precio: number; cantidad: number;}) => total += p.precio*p.cantidad);
    return total;
  }
  public rutaTerminar() {
    let ruta = "/terminar_compra/" + this.email
    return ruta;
  }

  logout(){
    this.cookieService.delete('token_access', '/');
    this.router.navigate(["/login"]);
  }

}
