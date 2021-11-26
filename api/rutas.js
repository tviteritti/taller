const rutas = require('express').Router();
require("dotenv").config();
var passwordValidator = require('password-validator');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const poolData = {
   UserPoolId : "us-east-2_wOdUv5xvk", // Your user pool id here
   ClientId: "2umq93aialvav4ude9na1eqhvi" // Your client id here
   };
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//const AWS = require('aws-sdk');
//const request = require('request');
//const jwkToPem = require('jwk-to-pem');
//const jwt = require('jsonwebtoken');

fs = require("fs");
var fs = require('fs');

var path = require('path');
const session = require("express-session");

const productModel = require("./models/productModel");
const ventaModel = require("./models/ventas_model");
const clienteModel = require("./models/clientes_model");
const productoVendidoModel = require("./models/producto_vendido_model");
global.fetch = require('node-fetch');

rutas.use(session({
    secret: '1234',
    saveUninitialized: true,
    resave: false,
  }))
 /* rutas.use(carrito.initialize());
  rutas.use(carrito.session());
  rutas.use(session(
         '1234'
    ));*/
const indiceDeProducto = (carrito, idProducto) => {
    return carrito.findIndex(productoDentroDelCarrito => productoDentroDelCarrito.id === idProducto);
  }
  const existeProducto = (carrito, producto) => {
    return indiceDeProducto(carrito, producto.id) !== -1;
  }
rutas.post('/login', function (req, res) {
    /* res.send('hola inicio'); */
    const { email, username, password } = req.body;
    console.log(email);


     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    });

    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());

        },
        onFailure: function(err) {
            console.log(err);
        },

    });
});
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
rutas.post('/register', function (req, res) {
    const { email, username, password } = req.body;
    const errors =validationResult(req);

    if (errors.length>0) {
      console.log(errors)
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    console.log("pase por el post de register bro")

    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));

    userPool.signUp(username, password, attributeList, null,
    function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
});

rutas.get('/login', function (req, res) {
    /* res.send('hola inicio'); */
    console.log(req.body);

   console.log("get bro login");
});


rutas.get("/product",async (req, res) => {

      const producto = await productModel.obtenerConFotos();
      res.json(producto);
});
rutas.post("/product",async (req, res) => {
    console.log("pase por el product post")

    const producto = req.body;
    const respuesta = await productModel.insertar(producto.nombre,producto.clasificacion, producto.descripcion, producto.precio,producto.foto);
    res.json(respuesta);
});
rutas.get("/ventas", async (req, res) => {
    const ventas = await ventaModel.obtener();
    res.json(ventas);
  });
rutas.post("/compra", async (req, res) => {
    const {nombre, direccion} = req.body;
    let total = 0;

    const carrito = req.session.carrito || [];
    carrito.forEach(p => total += p.precio);
    const idCliente = await clienteModel.insertar(nombre, direccion);
    const idVenta = await ventaModel.insertar(idCliente, total);
    // usamos for en lugar de foreach por el await
    for (let m = 0; m < carrito.length; m++) {
      const productoActual = carrito[m];
      await productoVendidoModel.insertar(idVenta, productoActual.id);
    }
    // Limpiar carrito...
    req.session.carrito = [];
    // ¡listo!
    res.json(true);
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
rutas.get("/carrito", (req, res) => {
  res.json(req.session.carrito || []);
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
  rutas.post("/carrito/existe", async (req, res) => {
    const idProducto = req.body.id;
    const producto = await productModel.obtenerPorId(idProducto);
    const existe = existeProducto(req.session.carrito || [], producto);
    res.json(existe);
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
