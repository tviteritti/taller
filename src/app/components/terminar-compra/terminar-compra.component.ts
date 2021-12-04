
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
  ImagePath: string;
  constructor(private route: ActivatedRoute,private router: Router,private carritoService: CarritoService,private ClienteService:ClienteService, private VentaService:VentaService) {
    this.ImagePath = '/assets/shop.png'
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

  public revisarYTerminar(stepper: any) {

    this.VentaService.terminarCompra(this.idVenta).subscribe(() => { });

    this.compraTerminada=true;
    stepper.next();
  }

  public total() {
    let total = 0;
    this.carrito.forEach((p: { precio: number; cantidad: number;}) => total += p.precio*p.cantidad);
    return total;
  }

  async ngOnInit() {
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
    this.router.navigate(['home/' + this.email]).then(()=>{
      window.location.reload();
    })    ;
  }
  public rutaImagen(nombre:string){
    return "../../../assets/fotos_productos/"+ nombre;
  }




}
