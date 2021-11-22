const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sasa',//su password
    port: 3306,
    database: 'tallerweb2' //su nombre de bd
});

conexion.connect((err) => {
    if (err) {
        console.log("error bd" + err);
    } else {
        console.log("bien bd");
    }
});

module.exports = conexion; 
