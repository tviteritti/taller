import { environment } from 'src/environments/environment';
import {Component, Input, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { CarritoService } from 'src/app/SERVICES/carrito.service';
import { ClienteService } from '../../SERVICES/cliente.service';
import { VentaService } from '../../SERVICES/venta.service';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto: any;
  email: string = '';
  idCliente: any = 0;
  idVenta: any = 0;

  constructor(private router: Router, private serviceCarrito: CarritoService,private route: ActivatedRoute, private VentaService:VentaService, private ClienteService:ClienteService) {
  }
  
  ngOnInit(): void {
     this.email = this.route.snapshot.params['email'];

    this.ClienteService.obtenerId(this.email).subscribe(data => {   
      this.idCliente = data;
      this.idCliente = this.idCliente.id;

      if(this.idCliente!= null) {
        this.VentaService.obtenerIdVenta(this.idCliente).subscribe(data => {   
          this.idVenta = data;
          this.idVenta = this.idVenta.id;
        })
      }
    });
  }

  public resolverRuta() {
    const baseUrl = environment.baseUrl;
    return `../../../assets/fotos_productos/${this.producto.foto}`;
  }

  public agregarAlCarrito(id:number) {
    this.serviceCarrito.agregarAlCarrito(this.idVenta, id).subscribe(() => { });
    window.location.reload();
  }
  public quitarDelCarrito(id:number) {
    this.serviceCarrito.quitarProducto(this.idVenta, id).subscribe(() => { });
    window.location.reload();
  }

}
