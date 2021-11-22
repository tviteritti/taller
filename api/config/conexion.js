const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',//su password
    port: 3306,
    database: '' //su nombre de bd
});

conexion.connect((err) => {
    if (err) {
        console.log("error bd" + err);
    } else {
        console.log("bien bd");
    }
});

module.exports = conexion;
