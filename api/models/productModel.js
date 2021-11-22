const conexion = require("../config/conexion")
<<<<<<< HEAD
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
=======
//const fs = require("fs");
//const path = require("path");
//const { stringify } = require("querystring");
>>>>>>> 17fdf2369f41c004852bd4adee848d2484eb3687

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
<<<<<<< HEAD
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
=======
    return new Promise((resolve, reject) => {
      conexion.query(`select id, nombre, descripcion, precio from productos`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
  });
  },
  obtenerPrimeraFoto(idProducto) {
    return new Promise((resolve, reject) => {
      conexion.query(`select foto from fotos_productos WHERE id_producto = ? limit 1`,
        [idProducto],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0].foto);
        });
    });
  },
  obtenerConFotos() {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from productos`,
        async (err, resultados) => {
          if (err) reject(err);
          else {
            for (let x = 0; x < resultados.length; x++) {
              resultados[x].foto = await this.obtenerPrimeraFoto(resultados[x].id);
            }
            resolve(resultados);
          }
        });
    });
  },
   obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select id, nombre,descripcion, precio from productos where id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
>>>>>>> 17fdf2369f41c004852bd4adee848d2484eb3687


  
}