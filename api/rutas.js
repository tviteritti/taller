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
const validateName = (name) => {
  return String(name)
    .toLowerCase()
    .match(
      /^(?=(?:^\w))([A-Za-z ]+)(?<=[^ ])$/
      );
};
const validateLastName = (apellido) => {
  return String(apellido)
    .toLowerCase()
    .match(
      /^(?=(?:^\w))([A-Za-z ]+)(?<=[^ ])$/
      );
};
const validateAddress = (direccion) => {
  return String(direccion)
    .toLowerCase()
    .match(

      /^(?=(?:^\w))([A-Za-z0-9 ]+)(?<=[^ ])$/    );
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

const validatePrice = (price) => {
  return String(price)
    .toLowerCase()
    .match(
      /^(?=(?:^\w))([0-9 ]+)(?<=[^ ])$/
      );
};
const validationResult = (req) => {
  var errors = [];
  var errorUsername = "Cambiar username tiene que ser un mail valido "
  var errorEmail = "Cambiar email tiene que ser un mail valido "
  var errorPassword= "Error en la contraseña debe contener 1 dígito, 1 letra mayúscula, 1 letra minúscula, 1 caracter especial y el tamaño debe ser mayor a 8"
  var errorName= "El campo nombre no puede estar vacio y no puede contener caracteres especiales"
  var errorLastName= "El campo apellido no puede estar vacio y no puede contener caracteres especiales"
  var errorAddress= "El campo direccion no puede estar vacio y no puede contener caracteres especiales(solo letras y números)"
  const { email, username, contraseña,nombre,apellido,direccion } = req.body
  console.log("campo nombre " + nombre)
  var i = 0;
  if(!validateEmail(email)){

    errors[i]= errorEmail;
    console.log(errors[i])
    i++;
  }
  if(!validateEmail(username)){

    errors[i]= errorUsername;
    console.log(errors [i])
    i++;

  }
  if(!validatePass(contraseña)){

    errors [i] = errorPassword;
    console.log(errors[i])
    i++;
    }
  if(!validateName(nombre) ){
    errors [i] = errorName;
    console.log(errors[i])
    i++;
  }
  if(!validateLastName(apellido) ){
    errors [i] = errorLastName;
    console.log(errors[i])
    i++;
  }
  if(!validateAddress(direccion) ){
    errors [i] = errorAddress;
    console.log(errors[i])
    i++;
  }

  return errors;
}
const validationResultProduct = (req) => {
  var errors = [];
  var errorName= "El campo nombre no puede estar vacio y no puede contener caracteres especiales"
  var errorClasificacion= "El campo clasificacion no puede estar vacio y no puede contener caracteres especiales"
  var errorDescripcion= "El campo descripcion no puede estar vacio y no puede contener caracteres especiales(solo letras y números)"
  var errorPrice= "El campo precio solo puede contener dígitos"

  const { nombre,clasificacion,descripcion,precio } = req.body
  console.log("campo nombre " + nombre)
  var i = 0;
  if(!validateName(nombre) ){
    errors [i] = errorName;
    console.log(errors[i])
    i++;
  }
  if(!validateName(clasificacion) ){
    errors [i] = errorClasificacion;
    console.log(errors[i])
    i++;
  }
  if(!validateName(descripcion) ){
    errors [i] = errorDescripcion;
    console.log(errors[i])
    i++;
  }
  if(!validatePrice(precio) ){
    errors [i] = errorPrice;
    console.log(errors[i])
    i++;
  }
  return errors;
}

rutas.get("/product", (req, res) => {
        productModel.obtenerConFotos().then((producto)=>{
        res.json(producto);
      })

});
rutas.post("/product", (req, res) => {
    var errors=[]=validationResultProduct(req)
    if(errors.length==0){
    const producto = req.body;
    productModel.insertar(producto.nombre,producto.clasificacion, producto.descripcion, producto.precio,producto.foto).then((respuesta)=>{
      res.json(respuesta);
    })

    }else{
      console.log("Fallo agregar producto")
      res.status(400).json({
        message:"Problema con el agregado de producto",
        errors: errors,
      });
    }
});
rutas.get("/ventas", (req, res) => {
      ventaModel.obtener().then((ventas)=>{
      res.json(ventas);
    })

  });

rutas.post("/detalle_venta", (req, res) => {
    if (!req.query.id) {
        res.end("Not found");
        return;
      }
      const idVenta = req.query.id;
      ventaModel.obtenerPorId(idVenta).then((venta)=>{
        res.json(venta);
      })
      /*este parece que no hace nada
       venta.productos = await ventaModel.obtenerProductosVendidos(idVenta);
       */


  });

rutas.post("/carritoCompra", (req, res) => {
    const id = req.body.id;
     ventaModel.obtenerProductosVendidos(id).then((producto)=>{
      res.json(producto);
     })

});

rutas.post("/obtenerIdcliente",  (req, res) => {
  const email = req.body.email;
      clienteModel.obtenerId(email).then((id)=>{
      res.json(id);
     })

  });

rutas.post("/obtenerIdvent", (req, res) => {
    const idC = req.body.id;
      ventaModel.obtenerIdVenta(idC).then((id)=>{
      res.json(id);
     })

});
rutas.post("/registro", (req, res) => {
    var errors=[]=validationResult(req)
    const {nombre,contraseña,apellido,direccion,email} = req.body;
    if(errors.length==0){
     const cliente =  clienteModel.insertar(nombre,contraseña,apellido,direccion,email).then((cliente)=>{
       ventaModel.insertar(cliente,0);
       res.json(cliente);
     })
    }
    else{
      console.log("Fallo registro")
      res.status(400).json({
        message:"Problema en el registro analice sus campos",
        errors: errors,
      });

    }
  });

  rutas.post("/carrito/agregar", (req,res)=>{
    const { idV, idP } = req.body;
    productoVendidoModel.obtenerCantidad(idV, idP).then((cantidad)=>{
      if (cantidad !== undefined && cantidad !== NaN) {
        cantidad = cantidad.cantidad
      } else {
        cantidad = 0;
      }
      cantidad++;
        if (cantidad === 1) {
          productoVendidoModel.insertar(idV,idP,cantidad).then((producto)=>{
            res.json(producto);
          })
        } else {
          productoVendidoModel.insertarCantidad(idV,idP,cantidad).then((producto)=>{
            res.json(producto);
          })
        }
    }).catch(error =>{
      console.log(error);
    })
    }
  )

  rutas.post("/carrito/eliminar", (req, res)=>{
    const { idV, idP } = req.body;
    let cantidad = 0;
    let producto;

    productoVendidoModel.obtenerCantidad(idV, idP).then((cantidad)=>{
      if (cantidad !== undefined && cantidad !== NaN) {
        cantidad = cantidad.cantidad
        } else {
          res.json('no hay en el carrito');
          return;
      }

    cantidad--;

    if (cantidad === 0) {
      productoVendidoModel.eliminar(idV,idP,cantidad).then((producto)=>{
        res.json(producto);
      })
    } else {
        productoVendidoModel.insertarCantidad(idV,idP,cantidad).then((producto)=>{
        res.json(producto);
      })
    }
  })
});

  rutas.post("/terminarCompra",  (req, res)=>{
    const idV = req.body.idV;
    ventaModel.terminarCompraProductoVendido(idV).then((productoVenta)=>{
      res.json(productoVenta);
    })
});

module.exports = rutas;
