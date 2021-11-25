
import {Component, OnInit} from '@angular/core';
import { CarritoService } from "../../SERVICES/carrito.service";
import {Router,ActivatedRoute} from "@angular/router";
import { ClienteService } from 'src/app/SERVICES/cliente.service';
import { VentaService } from 'src/app/SERVICES/venta.service';

@Component({
  selector: 'app-terminar-compra',
  templateUrl: './terminar-compra.component.html',
  styleUrls: ['./terminar-compra.component.css']
})
export class TerminarCompraComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,private carritoService: CarritoService,private ClienteService:ClienteService, private VentaService:VentaService) {
  }

  public compraTerminada = false;
  public productos = [];
  email: string = '';
  idCliente: any = 0;
  idVenta: any = 0;
  public columnas = ['nombre', 'descripcion', 'precio', 'quitar'];
  clienteModel: any = {
    direccion: "",
    nombre: "",
    password: ""
  };
  carrito: any = [];

  public async revisarYTerminar(stepper: any) {
    if (!this.clienteModel.direccion) {
      return alert("Falta escribir la dirección del cliente");
    }
    if (!this.clienteModel.nombre) {
      return alert("Falta escribir el nombre del cliente");
    }
    this.VentaService.terminarCompra(this.idVenta).subscribe(data => { });


    this.compraTerminada=true;
    stepper.next();
  }

  public total() {
    let total = 0;
    this.carrito.forEach((p: { precio: number; cantidad: number;}) => total += p.precio*p.cantidad);
    return total;
  }

  async ngOnInit() {
    /* await this.obtenerProductos(); */
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
  public agregarAlCarrito(id:number) {
    console.log('agregar al carrito');
    this.carritoService.agregarAlCarrito(this.idVenta, id).subscribe(data => { });
    window.location.reload();
  }
  public quitarDelCarrito(id:number) {
    console.log('agregar al carrito');
    this.carritoService.quitarProducto(this.idVenta, id).subscribe(data => { });
    window.location.reload();
  }

  public terminarYRedirijir(){      
    this.router.navigate(['home/' + this.email]);
  }

}
