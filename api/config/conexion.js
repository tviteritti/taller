const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3276327632',//su password
    port: 3306,
    database: 'ecommercetaller1' //su nombre de bd
});

conexion.connect((err) => {
    if (err) {
        console.log("error bd" + err);
    } else {
        console.log("bien bd");
    }
});

module.exports = conexion;
