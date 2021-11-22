const rutas = require('express').Router();
require("dotenv").config();

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

rutas.post('/register', function (req, res) {
    const { email, username, password } = req.body;
    console.log("pase por el post de register bro")

    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
   // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"sampleEmail@gmail.com"}));
   // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

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
    console.log("pase por el backkkkkkkkkkkkkkkkkkkkkkkkkkk")
      const producto = await productModel.obtener();
      res.json(producto);
});
rutas.post("/product",async (req, res) => {
    console.log("pase por el product post")

    const producto = req.body;
    const respuesta = await productModel.insertar(producto.nombre,producto.clasificacion, producto.descripcion, producto.precio);
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
  })
  
  rutas.post("/carrito/existe", async (req, res) => {
    const idProducto = req.body.id;
    const producto = await productModel.obtenerPorId(idProducto);
    const existe = existeProducto(req.session.carrito || [], producto);
    res.json(existe);
  });
  
  rutas.post("/carrito/agregar", async (req, res) => {
    const idProducto = req.body.id;
    const producto = await productModel.obtenerPorId(idProducto);
    if (!req.session.carrito) {
      req.session.carrito = [];
    }
    // por el momento no se pueden llevar más de dos productos iguales
    if (existeProducto(req.session.carrito, producto)) {
      res.json(true);
      return;
    }
    req.session.carrito.push(producto);
    res.json(req.body);
  });
  
module.exports = rutas;
