const conexion = require("../config/conexion")
//const fs = require("fs");
//const path = require("path");
//const { stringify } = require("querystring");

module.exports = {
  insertar(nombre,clasificacion,descripcion,precio) {
    console.log("entre a modelo producto")
    return new Promise((resolve, reject) => {
      conexion.query(`insert into productos
            (nombre,clasificacion,descripcion,precio)
            values
            (?,?,?,?)`,
        [nombre,clasificacion,descripcion,precio], (err, resultados) => {
          console.log("llegue a error arriba" + err)
          console.log("llegue a resultados arriba" + resultados)
          if (err) reject(err);
          else resolve(resultados.insertId);
        });

        console.log(resolve + " resolveee")
        console.log(reject + " reject")
    });
  },
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select id, nombre,clasificacion, descripcion, precio from productos`,
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
      conexion.query(`select id, nombre,clasificacion,descripcion, precio from productos where id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },



}
