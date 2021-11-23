
const conexion = require("../config/conexion")
module.exports = {
  insertar(nombre, direccion) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into clientes
            (nombre,direccion)
            values
            (?, ?)`,
        [nombre, direccion], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  obtenerId(email) {
    return new Promise((resolve, reject) => {
      conexion.query(`select id from clientes where email = ?`,
        [email], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
}
