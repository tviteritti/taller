const rutas = require('express').Router();
var passwordValidator = require('password-validator');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId : "us-east-2_wOdUv5xvk", // Your user pool id here
   ClientId: "2umq93aialvav4ude9na1eqhvi" // Your client id here
   };
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


const productModel = require("./models/productModel");
const ventaModel = require("./models/ventas_model");
const clienteModel = require("./models/clientes_model");
const productoVendidoModel = require("./models/producto_vendido_model");
global.fetch = require('node-fetch');

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePass = (pass) => {
  var schema = new passwordValidator();

  schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 2 digits
  .has().not().spaces()
  .has().symbols()                          
  return schema.validate(pass)
 

 
}
const validationResult = (req) => {
  var errors = [];
  var errorUsername = "Cambiar username tiene que ser un mail valido "
  var errorEmail = "Cambiar email tiene que ser un mail valido "
  var errorPassword= "Error en la contraseña debe contener 1 dígito, 1 letra mayúscula, 1 letra minúscula, 1 caracter especial y el tamaño debe ser mayor a 8"
  const { email, username, password } = req.body
  if(!validateEmail(email)){
  
    errors[0]= errorEmail;
    console.log(errors[0])
  }
  if(!validateEmail(username)){

    errors[1]= errorUsername;
    console.log(errors [1])

  }
  if(!validatePass(password)){
 
    errors [2] = errorPassword;
    console.log(errors[2])
    }
  
  
  return errors;
}


rutas.get("/product",async (req, res) => {

      const producto = await productModel.obtenerConFotos();
      res.json(producto);
});
rutas.post("/product",async (req, res) => {

    const producto = req.body;
    const respuesta = await productModel.insertar(producto.nombre,producto.clasificacion, producto.descripcion, producto.precio,producto.foto);
    res.json(respuesta);
});
rutas.get("/ventas", async (req, res) => {
    const ventas = await ventaModel.obtener();
    res.json(ventas);
  });

rutas.post("/detalle_venta", async (req, res) => {
    if (!req.query.id) {
        res.end("Not found");
        return;
      }
      const idVenta = req.query.id;
      const venta = await ventaModel.obtenerPorId(idVenta);
      venta.productos = await ventaModel.obtenerProductosVendidos(idVenta);
      res.json(venta);
  });

rutas.post("/carritoCompra", async (req, res) => {
    const id = req.body.id;
     const producto = await ventaModel.obtenerProductosVendidos(id);
      res.json(producto);
});
  
rutas.post("/obtenerIdcliente", async (req, res) => {
  const email = req.body.email;
     const id = await clienteModel.obtenerId(email);
      res.json(id);
  });
rutas.post("/obtenerIdvent", async (req, res) => {
    const idC = req.body.id;
     const id = await ventaModel.obtenerIdVenta(idC);
      res.json(id);
});
rutas.post("/registro", async (req, res) => {
    const {nombre,contraseña,apellido,direccion,email} = req.body;
     const cliente = await clienteModel.insertar(nombre,contraseña,apellido,direccion,email);
     const venta = await ventaModel.insertar(cliente,0);
      res.json(cliente);
  });


rutas.post("/carrito/agregar", async (req, res) => {
    const { idV, idP } = req.body;
    let cantidad = 0;
    let producto;
  
  cantidad = await productoVendidoModel.obtenerCantidad(idV, idP);
  if (cantidad !== undefined && cantidad !== NaN) {
    cantidad = cantidad.cantidad
  } else {
    cantidad = 0;
  }
    
  cantidad++;
    if (cantidad === 1) {
      producto = await productoVendidoModel.insertar(idV,idP,cantidad);
      
    } else {
      producto = await productoVendidoModel.insertarCantidad(idV,idP,cantidad);    
    }
      res.json(producto);
  });

  rutas.post("/carrito/eliminar", async (req, res) => {
    const { idV, idP } = req.body;
    let cantidad = 0;
    let producto;
    
    cantidad = await productoVendidoModel.obtenerCantidad(idV, idP);
      if (cantidad !== undefined && cantidad !== NaN) {
      cantidad = cantidad.cantidad
      } else {
        res.json('no hay en el carrito');
        return;
    }
      
    cantidad--;
    if (cantidad === 0) {
      producto = await productoVendidoModel.eliminar(idV,idP,cantidad);
      
    } else {
      producto = await productoVendidoModel.insertarCantidad(idV,idP,cantidad);    
    }
      res.json(producto);
  });
  rutas.post("/terminarCompra", async (req, res) => {
    const idV = req.body.idV;
    const productoVenta = await ventaModel.terminarCompraProductoVendido(idV);
      res.json(productoVenta);
});

module.exports = rutas;
