
const conexion = require("../config/conexion")
module.exports = {
  insertar(nombre, contraseña, apellido, direccion, email) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into clientes
            (nombre,contraseña,apellido,direccion,email)
            values
            (?, ?, ?, ?,?)`,
        [nombre,contraseña,apellido,direccion,email], (err, resultados) => {
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
