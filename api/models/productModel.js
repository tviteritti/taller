const conexion = require("../config/conexion")
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

module.exports = {
  insertar (id,nombre,descripcion,precio) {
    return ((resolve, reject) => {
      conexion.query(`insert into productos
            (id,nombre,descripcion,precio)
            values
            (?,?,?,?)`,
        [id,nombre,descripcion,precio], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  obtener() {
    return new Promise(function(resolve, reject) {
      // The Promise constructor should catch any errors thrown on
      // this tick. Alternately, try/catch and reject(err) on catch.
      var connection = conexion;

      var query_str =
      "SELECT *" +
      "FROM productos";

      

      connection.query(query_str, function (err, rows, fields) {
          // Call reject on error states,
          // call resolve with results
          if (err) {
              return reject(err);
          }
          console.log(rows)
          return resolve(rows);
      });
  });
  }


  
}