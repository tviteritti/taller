const rutas = require('express').Router();
require("dotenv").config();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
fs = require("fs");

var fs = require('fs');
var path = require('path');
const productModel = require("./models/productModel");

global.fetch = require('node-fetch');

const poolData = {
   UserPoolId : "us-east-2_wOdUv5xvk", // Your user pool id here
   ClientId: "2umq93aialvav4ude9na1eqhvi" // Your client id here
   };
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

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


  
module.exports = rutas;
