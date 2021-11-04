const rutas = require('express').Router();

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {    
   UserPoolId : "us-east-2_wOdUv5xvk", // Your user pool id here    
   ClientId: "2umq93aialvav4ude9na1eqhvi" // Your client id here    
   }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

rutas.post('/', function (req, res) {
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


module.exports = rutas;